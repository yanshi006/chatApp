import React, { useState } from "react";
import firebase from '../config/firebase';
import styled from "styled-components";
import Title from "../components/Title";
import InputField from "../components/InputField";
import Button from "../components/Button";

const SignUp = ({ history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  //この実装は、初めにuserがいたらroomにリダイレクトされているし、いなかったらloginにリダイレクトされているのでsignUpページにuserがいることはない。
  // if (user) {
  //   <Redirect to='/' />
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        history.push('/');
        // console.log(user)
        user.updateProfile({
          displayName: name
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // alert('このメールアドレスは他のアカウントで使用されています。')
          setEmailError('このメールアドレスは他のアカウントで使用されています。');
        } else if (error.code === 'auth/weak-password') {
          // alert('パスワードは6文字以上です。')
          setPasswordError('パスワードは6文字以上です。');
        }
        // console.log(error)
      });
  };

  return (
    <>
      <Title text='SignUp' />
      <FormStyle onSubmit={handleSubmit}>
        {/* <div>
          <Lavel htmlFor="email">e-mail</Lavel>
          <Input type="email" id="email" name="email" placeholder="email" required onChange={(e) => { setEmail(e.target.value) }} />
          <p>{emailError}</p>
        </div> */}
        <InputField
          type="emai"
          name="email"
          label="e-mail"
          placeholder="email"
          isRequired={true}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        {/* <div>
          <Lavel htmlFor="password">password</Lavel>
          <Input type="password" id="password" name="password" placeholder="password" required onChange={(e) => { setPassword(e.target.value) }} />
          <p>{passwordError}</p>
        </div> */}
        <InputField
          type="password"
          name="password"
          label="password"
          placeholder="password"
          isRequired={true}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        {/* <div>
          <Lavel htmlFor="yourName">name</Lavel>
          <Input type="name" id="yourName" name="name" placeholder="name" onChange={(e) => { setName(e.target.value) }} />
        </div> */}
        <InputField
          type="text"
          name="name"
          label="displayName"
          placeholder="表示名"
          isRequired={false}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" label='新規登録' />
        <Button type='link' to='/login' label='ログイン' />
      </FormStyle>
      {/* <a href="http://localhost:3000/login">ログイン</a> */}
    </>
  )
}

export default SignUp;

const FormStyle = styled.form`
  width 30%;
  margin: 0 auto;
  text-align: center;
  background-color: #ddd;
  padding: 40px 0;
` 