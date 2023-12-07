import { HttpInterface } from '../../api/networkInterface/api/httpInterface';
import useNetwork from '../../stores/network';
import Input from '../Input/Input.component';
import { useState } from 'react';
type Props = {
  closeModal: () => void;
  userId: string | undefined;
  userName: string | undefined;
};

export default function EditProfile({ closeModal, userId, userName }: Props) {
  const { httpInterface } = useNetwork();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bio, setBio] = useState<string>('');

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imageFile, bio);

    httpInterface
      .editProfile({
        profilePhoto: imageFile,
        profilePhrase: bio,
        userId,
        userName,
      })
      .then((res) => {
        console.log(res);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        alert('프로필 수정에 실패했습니다.');
      });
  };

  return (
    <div>
      <h2>프로필 편집</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor='profile-pic'>프로필 이미지:</label>
        <Input
          name='photo'
          type='file'
          id='photo'
          accept='image/*'
          onChangeHandler={imageUploadHandler}
        />

        <label htmlFor='bio'>소개글:</label>
        <textarea
          id='bio'
          name='bio'
          rows={4}
          cols={50}
          placeholder='소개글 입력해주세요'
          onChange={textInputHandler}></textarea>
        <input type='submit' value='업데이트'></input>
      </form>
      <input type='image' src='' alt='' />
    </div>
  );
}
