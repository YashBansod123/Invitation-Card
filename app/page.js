"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

export default function Home() {
  const [nameEnglish, setNameEnglish] = useState("");
  const [nameMarathi, setNameMarathi] = useState("");

  // Convert English to Marathi
  const convertToMarathi = async (engText) => {
    if (!engText.trim()) {
      setNameMarathi("");
      return;
    }
    try {
      const res = await axios.get(
        `https://inputtools.google.com/request?text=${encodeURIComponent(
          engText
        )}&itc=mr-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`
      );
      if (res.data && res.data[0] === "SUCCESS") {
        setNameMarathi(res.data[1][0][1][0]);
      }
    } catch (err) {
      console.error("Translation failed", err);
    }
  };

  const shareOnWhatsApp = async () => {
  const element = document.getElementById("invitationCard");
  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    // Download image for desktop
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${nameMarathi || "invitation"}.png`;
    link.click();

    // Copy image to clipboard (mobile supported browsers)
    if (navigator.clipboard && navigator.clipboard.write) {
      const blob = await (await fetch(dataURL)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      alert("Invitation image copied! Paste it in WhatsApp now.");
    } else {
      alert("Image downloaded! Share it manually on WhatsApp.");
    }
  } catch (err) {
    console.error("Error generating image", err);
  }
};


  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#fff8e7",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "26px",
          color: "#8b0000",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        💍 सगाई निमंत्रण 💍
      </h1>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter Receiver's Name (English)"
        value={nameEnglish}
        onChange={(e) => {
          setNameEnglish(e.target.value);
          convertToMarathi(e.target.value);
        }}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #8b0000",
          fontSize: "15px",
          marginBottom: "15px",
          width: "250px",
          color: "black",
          backgroundColor: "white",
          outline: "none",
        }}
      />

      {/* Card */}
      <div
        id="invitationCard"
        style={{
          backgroundImage: "url('backimg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          maxWidth: "300px",
          aspectRatio: "1 / 2",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px 60px",
          boxSizing: "border-box",
        }}
      >
        {/* Content Wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // ✅ centers horizontally
            textAlign: "center",
            width: "100%",
            margin: "60px auto",
            padding: "20px",
          }}
        >
          <h3
            style={{
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Playfair Display', serif",
              marginBottom: "8px",
              fontSize: "clamp(14px, 3.5vw, 18px)",
              marginBottom: "4px",
            }}
          >
            {nameMarathi || "मित्रा"},
          </h3>

          {/* Couples Name Centered */}
          <p
            style={{
              whiteSpace: "nowrap",
              fontSize: "clamp(14px, 3.2vw, 18px)",
              fontWeight: "bold",
              color: "yellow",
              marginBottom: "8px",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              lineHeight: "1.4",
              fontFamily: "'Great Vibes', cursive",
            }}
          >
            पल्केश रामटेके ❤️ अश्विनी बन्सोड
          </p>

          <p
            style={{
              fontSize: "clamp(10px, 2.8vw, 14px)",
              fontWeight: "bold",
              lineHeight: "1.4",
              color: "yellow",
              marginBottom: "8px",
            }}
          >
            आपल्याला आमच्या सगाई सोहळ्याला सहर्ष निमंत्रण!<br />
            📅 दिनांक: १७ ऑगस्ट २०२५ | रविवार<br />
            ⏰ वेळ: दुपारी ३ वाजता पासून<br />
            📍 स्थळ: दर्शन सेलिब्रेशन, ओल्ड कामठी रोड,<br />
            जवळ भवानी माता मंदिर, कलमणा, नागपूर,<br />
            महाराष्ट्र - ४४००२२६
          </p>

          <p
            style={{
              marginTop: "6px",
              color: "skyblue",
              fontWeight: "bold",
              fontSize: "clamp(10px, 2.5vw, 14px)",
            }}
          >
            आपली उपस्थिती आम्हाला आनंद देईल!
          </p>
        </div>
      </div>

      {/* WhatsApp Share Button */}
      <button
        onClick={shareOnWhatsApp}
        style={{
          background: "rgb(37, 211, 102)",
          color: "white",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        📤 Share on WhatsApp
      </button>
    </div>
  );
}
