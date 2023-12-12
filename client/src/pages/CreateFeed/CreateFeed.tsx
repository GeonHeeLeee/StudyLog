import React, { ChangeEvent, FormEvent, useState } from 'react';
import useLoginState from '../../stores/login';
import Input from '../../components/Input/Input.component';
import Button from '../../components/Button/Button.component';
import useNetwork from '../../stores/network';
import { useNavigate } from 'react-router-dom';
import styles from './CreateFeed.module.css';

export default function CreateFeed() {
  const {
    userInfo: { userId },
  } = useLoginState();
  const [imageFile, setImageFile] = useState<File>();
  const [feedBody, setFeedBody] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { httpInterface } = useNetwork();
  const navigate = useNavigate();

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    console.log(file);
    setImageFile(file);
  };

  const textInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedBody(e.target.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedBody.length < 3) {
      alert('최소 3 글자 이상입력해주세요');
      return;
    }
    if (isUploading) {
      alert('업로드 중입니다!');
      return;
    }
    let photoUrl = '';
    setIsUploading(true);

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'studyLog');
      try {
        const response = await httpInterface.uploadImage(formData);
        photoUrl = response.data.secure_url;
        console.log(photoUrl);
      } catch (err) {
        console.error(err);
        setIsUploading(false);
        return;
      }
    }

    try {
      const response = await httpInterface.postFeed({
        writerId: userId,
        feedBody,
        photo: photoUrl,
      });
      console.log(response);
      if (response.status === 200) {
        navigate('/main');
      } else {
        alert('게시글 올리기 실패');
      }
      // if (response.status )
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <h2 className={styles['feed-name']}>피드 생성</h2>
      </header>

      <form onSubmit={submitHandler} className={styles['form-container']}>
        {/* <div>
          <label htmlFor='photo' className={styles.label}>
            이미지 업로드 (최대 1개)
          </label>
          <Input
            name='photo'
            type='file'
            id='photo'
            accept='image/*'
            onChangeHandler={imageUploadHandler}
            className={styles['file-input']}
            // style={{ opacity: imageFile?.name ? '0' : '1' }}
          />
          <p>{imageFile?.name}</p>
        </div> */}
        <div className={styles.filebox}>
          <label htmlFor='upload-name' className={styles['label-text']}>
            이미지 업로드 (최대 1개)
          </label>
          <Input
            className={styles['upload-name']}
            name='upload-name'
            value={imageFile?.name.length === 0 ? '첨부파일' : imageFile?.name}
            onChangeHandler={() => {}}
            placeholder='첨부파일'
          />
          <label htmlFor='file' className={styles.label}>
            파일찾기
          </label>
          <Input
            type='file'
            id='file'
            name='file'
            accept='image/*'
            onChangeHandler={imageUploadHandler}
          />
        </div>
        <div className={styles['feedbody-container']}>
          <label htmlFor='feedBody' className={styles['label-text']}>
            피드본문(최소 3글자 이상 입력해주세요)
          </label>
          <div className={styles['textarea-container']}>
            <textarea
              placeholder='200자 이내'
              id='feedBody'
              name='feedBody'
              maxLength={200}
              value={feedBody}
              onChange={textInputHandler}
              className={styles.textarea}
            />
            <p className={styles['text-length']}>{feedBody.length}/200</p>
          </div>
        </div>
        <Button
          text='피드 업로드'
          type='submit'
          disabled={isUploading}
          className={styles['check-button']}
        />
      </form>
    </div>
  );
}
