"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import PhoneInputWithOtp from "./components/phoneotp.input";
import OtpInput from "./components/otp.input";
import MainInput from "./components/main.input"; 
import PinInput from "./components/pin.input";
import Footer from "./components/footer";

export default function Home() {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(10);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isOtpValid, setIsOtpValid] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [birthplace, setBirthplace] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isPinStep, setIsPinStep] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [isPinMismatchDialogOpen, setIsPinMismatchDialogOpen] = useState<boolean>(false);

  const handleSendOtp = (number: string) => {
    console.log("Mengirim OTP ke nomor:", number);
    setPhoneNumber(number);
    setIsOtpSent(true);
    startTimer();
  };

  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };

  const validateOtp = () => {
    if (otp === "123456") { 
      setIsOtpValid(true);
    } else {
      alert("OTP yang dimasukkan salah.");
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setTimer(10);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = () => {
    startTimer();
    console.log("Mengirim ulang OTP ke nomor:", phoneNumber);
  };

  const handleRegisterClick = () => {
    if (pin !== confirmPin) {
      setIsPinMismatchDialogOpen(true);
    } else {
      setIsPinStep(true);
      if(pin.length != 0 ){
        router.push('/topup');
      }
    }
  };

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handleConfirmPinChange = (newPin: string) => {
    setConfirmPin(newPin);
    // router.push('/topup');
  };

  const closePinMismatchDialog = () => {
    setIsPinMismatchDialogOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-sm space-y-2 p-4 min-h-screen">
      <Image
        className="dark:invert"
        src="/logo.png"
        alt="logo"
        width={240}
        height={42}
        priority
      />
      {!isOtpSent ? (
        <>
          <h5 className="text-xl">Selamat Datang</h5>
          <p>Expresikan perjalananmu menggunakan LRT Pay</p>
          <div className="w-full flex justify-center items-center p-4">
            <PhoneInputWithOtp onSendOtp={handleSendOtp} />
          </div>
          <p>
            Seluruh transaksi aman, dengan melanjutkan proses ini. Menu{" "}
            <span className="text-red-600 font-semibold cursor-pointer">syarat & ketentuan</span> yang berlaku
          </p>
        </>
      ) : !isOtpValid ? (
        <>
          <h5 className="text-xl">Verifikasi Kode OTP</h5>
          <p>Masukkan 6 digit kode yang sudah dikirim ke nomor kamu dibawah ini ya!</p>
          <p>{phoneNumber}</p>
          
          <OtpInput id="otp" onChangeOtp={handleOtpChange} />
          
          <p>Tidak terima kode?</p>
          {isTimerActive ? (
            <p>Kirim kode kembali dalam <span>{`00:${timer < 10 ? `0${timer}` : timer}`}</span></p>
          ) : (
            <button 
              onClick={handleResendOtp}
              className="text-blue-600 underline"
            >
              Kirim ulang kode OTP
            </button>
          )}
          <button
            onClick={validateOtp}
            className="w-full max-w-xs bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"
          >
            Verifikasi OTP
          </button>
        </>
      ) : isPinStep ? (
        <div className="w-full max-w-sm space-y-2">
          <h5>Buat PIN kamu!</h5>
          <PinInput id="pin" length={6} onChangePin={handlePinChange} />
          <h5>Konfirmasi PIN kamu!</h5>
          <PinInput id="pin2" length={6} onChangePin={handleConfirmPinChange} />
          <div className="flex flex-col justify-center items-center">
            <Image
              className="p-4"
              src="/pin.png"
              alt="pin logo"
              width={120}
              height={80}
              priority
            />
            <p className="text-xs">Seluruh informasi kamu terlindungi</p>
          </div>
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"
            onClick={handleRegisterClick}
          >
            Selesai
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          <h5 className="text-xl">Pendaftaran</h5>
          <MainInput
            type="tel"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Nomor telepon/handphone"
          />
          <MainInput
            value={name}
            onChange={setName}
            placeholder="Nama"
          />
          <MainInput
            type="date"
            value={birthdate}
            onChange={setBirthdate}
            placeholder="Tanggal Lahir"
          />
          <MainInput
            value={birthplace}
            onChange={setBirthplace}
            placeholder="Tempat Lahir"
          />
          <MainInput
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
          />
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-red-600"
            onClick={handleRegisterClick}
          >
            Daftar
          </button>
        </div>
      )}

      {isPinMismatchDialogOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h4 className="text-red-600 font-bold">PIN yang kamu masukkan TIDAK SESUAI</h4>
            <p>Silakan coba lagi.</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={closePinMismatchDialog} 
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
