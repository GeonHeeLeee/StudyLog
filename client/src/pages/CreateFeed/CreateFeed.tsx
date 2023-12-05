import React, { ChangeEvent, FormEvent, useState } from 'react';
import useLoginState from '../../stores/login';
import Input from '../../components/Input/Input.component';
import Button from '../../components/Button/Button.component';
import useNetwork from '../../stores/network';
import { useNavigate } from 'react-router-dom';

export default function CreateFeed() {
  const {
    userInfo: { userId },
  } = useLoginState();
  const [imageFile, setImageFile] = useState<File>();
  const [feedBody, setFeedBody] = useState('');
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
    let photoUrl = '';
    console.log(imageFile, photoUrl);

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'studyLog');
      try {
        const response = await httpInterface.uploadImage(formData);
        photoUrl = response.data.secure_url;
      } catch (err) {
        console.error(err);
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
      if(response.status === 200) {
        navigate('/main');
      } else {
        alert('게시글 올리기 실패');
      }
      // if (response.status )
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <header>
        <h2>피드 생성</h2>
      </header>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='photo'>이미지 업로드 (최대 1개)</label>
          <Input
            name='photo'
            type='file'
            id='photo'
            accept='image/*'
            onChangeHandler={imageUploadHandler}
          />
          <p>{imageFile?.name}</p>
        </div>
        <div>
          <label htmlFor='feedBody' />
          <textarea
            placeholder='200자 이내'
            id='feedBody'
            name='feedBody'
            maxLength={200}
            value={feedBody}
            onChange={textInputHandler}
          />
        </div>
        <Button text='피드 업로드' type='submit' />
      </form>
    </div>
  );
}
