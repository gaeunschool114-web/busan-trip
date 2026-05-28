"use client";

import { useState } from "react";

export default function Home() {

  const [tripType, setTripType] = useState("");
  const [region, setRegion] = useState("");
  const [resultHtml, setResultHtml] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {

    if (!tripType) {
      alert("여행 타입을 선택해주세요.");
      return;
    }

    if (!region) {
      alert("부산 지역을 입력해주세요.");
      return;
    }

    try {

      const response = await fetch(
        "https://leegaeun.app.n8n.cloud/webhook/busan-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            city: "busan",
            tripType: tripType,
            region: region,
            email: email,
          }),
        }
      );

      const html = await response.text();
      setResultHtml(html);

      console.log(html);

      alert("AI 여행 추천 생성 완료");

    } catch (error) {

      console.error(error);

      alert("오류가 발생했습니다.");

    }
  };

  const sendEmail = async () => {

    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }

    try {

      await fetch(
        "https://leegaeun.app.n8n.cloud/webhook/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            html: resultHtml,
          }),
        }
      );

      alert("이메일 발송 완료");

    } catch (error) {

      console.error(error);

      alert("이메일 발송 실패");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">

      {/* 상단 메인 배경 */}
      <section
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526481280695-3c4691f8f5e6?q=80&w=2070&auto=format&fit=crop')",
        }}
      >

        {/* 검은 오버레이 */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 메인 텍스트 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">

          <h1 className="text-6xl font-bold text-center">
            BUSAN TRAVEL AI
          </h1>

          <p className="mt-6 text-xl text-center max-w-2xl leading-relaxed">
            여행 스타일과 원하는 부산 지역을 입력하면
            AI가 관광지, 맛집, 쇼핑 장소를 자동 추천한다
          </p>

        </div>

      </section>

      {/* 메인 컨텐츠 */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        {/* 여행 스타일 */}
        <h2 className="text-4xl font-bold text-center mb-14">
          여행 스타일 선택
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* 혼자 여행 */}
          <button
            onClick={() => setTripType("혼자")}
            className={`rounded-3xl overflow-hidden shadow-xl transition duration-300 hover:scale-105 ${
              tripType === "혼자"
                ? "ring-4 ring-blue-500"
                : ""
            }`}
          >

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop"
              className="h-72 w-full object-cover"
            />

            <div className="bg-white p-6 text-left">

              <h3 className="text-3xl font-bold mb-3">
                혼자 여행
              </h3>

              <p className="text-gray-600 leading-relaxed">
                조용한 산책, 감성 카페,
                야경 중심 여행 코스를 추천한다
              </p>

            </div>

          </button>

          {/* 커플 여행 */}
          <button
            onClick={() => setTripType("커플")}
            className={`rounded-3xl overflow-hidden shadow-xl transition duration-300 hover:scale-105 ${
              tripType === "커플"
                ? "ring-4 ring-pink-500"
                : ""
            }`}
          >

            <img
              src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop"
              className="h-72 w-full object-cover"
            />

            <div className="bg-white p-6 text-left">

              <h3 className="text-3xl font-bold mb-3">
                커플 여행
              </h3>

              <p className="text-gray-600 leading-relaxed">
                사진 명소, 데이트 코스,
                감성 여행 장소를 추천한다
              </p>

            </div>

          </button>

          {/* 가족 여행 */}
          <button
            onClick={() => setTripType("가족")}
            className={`rounded-3xl overflow-hidden shadow-xl transition duration-300 hover:scale-105 ${
              tripType === "가족"
                ? "ring-4 ring-green-500"
                : ""
            }`}
          >

            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop"
              className="h-72 w-full object-cover"
            />

            <div className="bg-white p-6 text-left">

              <h3 className="text-3xl font-bold mb-3">
                가족 여행
              </h3>

              <p className="text-gray-600 leading-relaxed">
                아이와 함께 가기 좋은
                안전한 여행 코스를 추천한다
              </p>

            </div>

          </button>

        </div>

        {/* 지역 입력 */}
        <div className="mt-28">

          <h2 className="text-4xl font-bold text-center mb-10">
            원하는 부산 지역 입력
          </h2>

        <div className="max-w-3xl mx-auto">

          <input
            type="text"
            placeholder="예: 광안리, 해운대, 송도, 영도, 다대포"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full p-6 rounded-3xl text-xl border border-gray-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
          />

        </div>

        <div className="max-w-3xl mx-auto mt-6">

          <input
            type="email"
            placeholder="결과를 받을 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-6 rounded-3xl text-xl border border-gray-300 shadow-lg"
          />

          </div>

        </div>

        {/* 생성 버튼 */}
        <div className="flex justify-center mt-20">

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white text-2xl px-14 py-6 rounded-3xl shadow-2xl"
          >
            AI 부산 여행 추천 생성하기
          </button>

        </div>

        {/* 결과 출력 */}
        {resultHtml && (

          <div className="max-w-6xl mx-auto mt-10">

            <div
              className="bg-white p-8 rounded-3xl shadow-xl"
              dangerouslySetInnerHTML={{
                __html: resultHtml,
              }}
            />

            <div className="bg-white p-8 rounded-3xl shadow-xl mt-6">

              <h2 className="text-3xl font-bold mb-6">
                이메일로 여행 가이드 받기
              </h2>

              <input
                type="email"
                placeholder="이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border rounded-xl"
              />

              <button
                onClick={sendEmail}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
              >
                이메일 받기
              </button>

            </div>

          </div>

        )}  

      </section>

    </main>
  );
}