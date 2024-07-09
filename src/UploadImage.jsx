import { useCallback, useState } from "react";
import styled from "styled-components";
import { updateImage } from "./apis/post";
import { useMutation } from "@tanstack/react-query";

const ImageDiv = styled.div`
  border: 1px dashed black;
  width: 500px;
  height: 300px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageInput = styled.input`
  /* display: none; */
`;

const Image = styled.img`
  width: auto;
  height: 80%;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid black;
  margin-top: 20px;
`;

const UploadImage = ({ name, password }) => {
  const [uploadImg, setUploadImg] = useState();

  const { mutate } = useMutation({
    mutationFn: updateImage,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    if (selectedImg) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setUploadImg(reader.result);
      };
      reader.readAsDataURL(selectedImg);
    }
  };

  const handleImgUpload = async (base64ImageData) => {
    // Base64 문자열에서 데이터 파트만 추출
    const base64Response = base64ImageData.split(";base64,").pop();

    // Blob 객체로 변환
    const imageBlob = await fetch(
      `data:image/jpeg;base64,${base64Response}`
    ).then((res) => res.blob());

    const formData = new FormData();
    // Blob 객체를 FormData에 추가

    formData.append("membername", name); // "profile.jpg"는 서버에서 요구하는 파일명에 따라 바꿔야 할 수도 있습니다.
    formData.append("memberpassword", password); // "profile.jpg"는 서버에서 요구하는 파일명에 따라 바꿔야 할 수도 있습니다.
    formData.append("img", imageBlob, "img.jpg"); // "profile.jpg"는 서버에서 요구하는 파일명에 따라 바꿔야 할 수도 있습니다.

    // PATCH 요청 보내기
    mutate(formData);
  };

  return (
    <>
      <ImageDiv>
        <ImageInput type="file" onChange={handleImgChange}></ImageInput>
        <Image src={uploadImg} size={150}></Image>
      </ImageDiv>

      <Button
        onClick={() => {
          handleImgUpload(uploadImg);
        }}
      >
        보내기
      </Button>
    </>
  );
};

export default UploadImage;
