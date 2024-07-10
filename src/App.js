import { useState } from "react";
import styled from "styled-components";
import UploadImage from "./UploadImage";

const Layout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 50px;
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 50px;
  max-width: 500px;
  width: 80%;
`;

const NameInput = styled.input`
  width: 100%;
  height: 100px;
  padding: 12px;
  color: black;
  background-color: white;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: black;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 100px;
  padding: 12px;
  color: black;
  background-color: white;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: black;
  }
`;

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const ALLOWED_TEXT_REG_EXP = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/;

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (!ALLOWED_TEXT_REG_EXP.test(newName)) {
      setName("");
      return;
    }
    setName(newName);
  };

  const handleKeyDown = (e) => {
    if (e.code !== "Enter" && e.code !== "NumpadEnter") {
      return;
    }
    e.preventDefault();
  };

  const handlePasswordChange = (e) => {
    const newName = e.target.value;
    if (!ALLOWED_TEXT_REG_EXP.test(newName)) {
      setPassword("");
      return;
    }
    setPassword(newName);
  };

  return (
    <Layout>
      <Title>관리자 사진 등록 페이지</Title>
      <InputBox>
        <NameInput
          id="name"
          value={name}
          placeholder="가게 이름"
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          type="text"
          required
        ></NameInput>
      </InputBox>
      <InputBox>
        <PasswordInput
          id="password"
          value={password}
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
          type="password"
          required
        ></PasswordInput>
      </InputBox>
      <UploadImage name={name} password={password} />
    </Layout>
  );
}

export default App;
