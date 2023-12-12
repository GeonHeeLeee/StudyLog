import useNetwork from '../../stores/network';
import Input from '../Input/Input.component';
import { useState } from 'react';
import styles from './EditProfileModal.module.css';
import Button from '../Button/Button.component';

type Props = {
  closeModal: () => void;
  userId: string;
  userName: string;
};

export default function EditProfile({ closeModal, userId, userName }: Props) {
  const { httpInterface } = useNetwork();

  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [bio, setBio] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    console.log(file);
    setImageFile(file);
  };

  const textInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setBio(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUploading) {
      alert('업로드 중입니다!');
      return;
    }
    setIsUploading(true);

    let photoUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'studyLog');
      try {
        const response = await httpInterface.uploadImage(formData);
        console.log('업로드', response);
        photoUrl = response.data.secure_url;
      } catch (err) {
        console.error(err);
        alert('이미지 업로드 실패...😢');
        setIsUploading(false);
        return;
      }
    }

    try {
      const response = await httpInterface.editProfile({
        profilePhoto: photoUrl.length > 0 ? photoUrl : '',
        profilePhrase: bio,
        userId,
        userName,
      });
      console.log('변경', response);
      alert('변경 완료!');
    } catch (error) {
      console.error(error);
      alert('수정 실패...😢');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>프로필 편집</h2>
      <form onSubmit={submitHandler} className={styles.filebox}>
        <div>
          <label htmlFor='upload-name' className={styles['label-text']}>
            프로필 이미지:
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
        <div className={styles['form-contaienr']}>
          <label htmlFor='bio' className={styles['label-text']}>
            소개글:
          </label>
          <textarea
            id='bio'
            name='bio'
            rows={4}
            cols={50}
            placeholder='소개글 입력해주세요'
            onChange={textInputHandler}
            className={styles['textarea']}
          ></textarea>
          <Button
            type='submit'
            text='업데이트'
            disabled={isUploading}
            className={styles['submit-button']}
          />
        </div>
      </form>
      <input type='image' src='' alt='' />
    </div>
  );
}
