"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import Modal from "./modal";
import Image from "next/image";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function AuthModals({
  isCompact,
  displayText,
  className,
}: {
  isCompact: boolean;
  displayText?: string;
  className?: string;
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      <div
        className={`flex justify-center cursor-pointer`}
        onClick={() => setShowLoginModal(true)}
      >
        <button className={className} style={{ color: "black" }}>
          {displayText ? (
            displayText
          ) : isCompact ? (
            <Image
              src={"/icons/login.png"}
              alt={"icon"}
              height={40}
              width={40}
            />
          ) : (
            "Login"
          )}
        </button>
      </div>

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
