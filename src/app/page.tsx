"use client";
import { useState } from "react";
import Hero from "./components/Hero";
import { predict } from "./utils/predict";

interface Results {
  confidence: number;
  prediction: string |number
}

export default function Home() {
  const [analysis, setAnalysis] = useState(false);
  const [biography, setBiography] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results| null>(null);

  const likelihood = (prediction: string | number) => {
    console.log({ prediction, type: typeof prediction });
  
    // Ensure prediction is treated as a number
    const numericPrediction = Number(prediction);
  
    // Reverse logic for 0 and other values
    if (numericPrediction === 0) {
      return "Likely Serial Killer";
    } else {
      return "Unlikely Serial Killer";
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await predict({ biography });
      console.log(result);
      setResults(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="px-20 py-10">
      <Hero setAnalysis={setAnalysis} />
      <div className="mx-auto">
        {analysis && (
          <div className="mx-auto text-center w-3/4">
            <p className="text-2xl text-white ">
              Provide a detailed biography of the individual you wish to
              analyze. Include relevant life events, behavioral patterns, and
              any additional information you believe is significant
            </p>
            <textarea
              className="w-full h-96 bg-white text-[#1A1A1A] p-5 my-10 rounded-lg focus:outline-none placeholder:text-[#929292] placeholder:text-xl"
              rows={5}
              placeholder="Write the biography here (max 10,000 characters)..."
              onChange={(event) => setBiography(event.target.value)}
            />
            {/* <button className="text-[32px] bg-[#4A90E2] rounded-lg text-white w-1/2 px-12 py-2 text-center"
            onClick={handleSubmit}
            >
              Analyze
            </button> */}
            <button
              className={`text-[32px] rounded-lg w-1/2 px-12 py-2 text-center ${
                loading
                  ? "bg-[#6C757D] text-gray-300 cursor-not-allowed"
                  : "bg-[#4A90E2] text-white"
              }`}
              onClick={!loading ? handleSubmit : undefined}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin h-6 w-6 rounded-full border-4 border-t-[#FFFFFF] border-[#6C757D]" />
                  <span>Analyzing</span>
                </div>
              ) : (
                "Analyze"
              )}
            </button>

            {results && (
              <div className="mt-8 space-y-6">
                <div className="flex gap-5">
                  <h2 className="text-white font-bold text-[32px]">Results</h2>
                  <p className="text-2xl text-black py-2 bg-white px-10 rounded-lg">
                    {likelihood(results?.prediction)}
                  </p>
                </div>
                <div className="flex gap-5">
                  <h2 className="text-white font-bold text-[32px]">Sentiment Analysis Score:</h2>
                  <p className="text-2xl text-white py-2   rounded-lg font-extrabold">
                  {Math.floor(results?.confidence * 100)}%
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
