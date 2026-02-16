"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Modal from "./modal";
import Image from "next/image";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function AuthModals({ isCompact }: { isCompact: boolean }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer"
        style={{ color: "black" }}
        onClick={() => setShowLoginModal(true)}
      >
        {isCompact ? (
          <Image src={"/icons/login.png"} alt={"icon"} height={30} width={30} />
        ) : (
          "Login"
        )}
      </button>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm
          onOpenRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
          onForgotPassword={() => {
            setShowLoginModal(false);
            setShowForgotPassword(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      >
        <RegisterForm
          onOpenLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </Modal>
      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      >
        <ForgetPasswordForm
          onOpenLogin={() => {
            setShowForgotPassword(false);
            setShowLoginModal(true);
          }}
        />
      </Modal>
    </>
  );
}
