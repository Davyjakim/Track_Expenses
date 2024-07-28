import React, { useState } from "react";
import Dropdown from "../components/global/DropDown";
import { AiOutlineClose } from "react-icons/ai";
import apiClient from "../services/api-client";
import Loading from "../components/Loading";
import PopUpMessage from "../components/global/PopUpMessage";

function HowItWorks(props) {
  const { setisopen } = props;
  const [comment, setcomment] = useState("");
  const [isloading, setisloading] = useState(false);
  const [errors, setErrors] = useState("");
  const [messageFuser, setmessageFuser] = useState("");
  const [isPopupVisible, setisPopupVisible] = useState(false);

  const validate = () => {
    let errors = "";
    if (comment === "") {
      errors = "you have to enter something to send a comment";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnclick = () => {
    if (validate()) {
      setisloading(true);
      apiClient
        .post("/comment", {
          message: comment,
        })
        .then(() => {
          setisPopupVisible(true);
          setmessageFuser("Thank you very much, for your message");
          setcomment(""); // Clear the text area
        })
        .catch((err) => {
          setmessageFuser("Ouups it seems like there was an error");
          setisPopupVisible(true);
          console.log(comment);
        })
        .finally(() => {
          setisloading(false);
        });
    } else {
      setmessageFuser(errors || "Unknown error");
      setisPopupVisible(true);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 flex items-center justify-center min-h-screen bg-opacity-30 bg-black">
      {isloading && <Loading />}

      {isPopupVisible && (
        <PopUpMessage
          title="Hey there"
          message={messageFuser}
          isPopupVisible={isPopupVisible}
          setisPopupVisible={setisPopupVisible}
        />
      )}
      <div className="relative bg-white max-w-3xl w-full sm:w-max h-max rounded-lg p-2 sm:p-6 shadow-lg mx-2 sm:mx-0">
        <div>
          <h1 className="mx-2 mt-3 font-semibold text-xl sm:text-2xl mb-6">
            How It Works
          </h1>
          <div
            className="absolute top-5 right-5 hover:scale-150 active:border rounded-full"
            onClick={() => {
              setisopen(false);
            }}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="overflow-auto">
          <Dropdown
            title="Story of how this started"
            description={
              <div>
                With a typical expense tracker, you need to record your data
                every day and review all your expenses regularly. I found this
                process tiring and time-consuming. To make it simpler, I devised
                a way to track <strong>how much I spend per week</strong> by
                recording my account balance at the beginning and end of the
                week. By calculating the difference, I can easily see my weekly
                spending. If the amount is alarming, I know I need to adjust my
                buying habits.
              </div>
            }
          />
          <Dropdown
            title="What Problem This Solves"
            description={
              <div>
                <div>
                  We all want to manage our expenses efficiently and
                  effortlessly. However, the available solutions are often not
                  intuitive and can be very time-consuming and tiring to use.
                </div>
                <div>
                  This app helps you understand your spending by simply
                  recording your bank account balance at the beginning and end
                  of each week.
                </div>
              </div>
            }
          />
          <Dropdown
            title="How to Get Started"
            description={
              <div>
                <div>
                  Before setting up your account, you will need to record your
                  monthly expenses. This only needs to be done once a month.
                </div>
                <div>
                  Then, you just need to record your account balance twice a
                  week.
                </div>
                <div>
                  If you want a report of your expenses, go to the preview
                  option, enter a time frame, and hit preview.
                </div>
              </div>
            }
          />

          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Leave me a comment or suggestion
            </h1>
            <div className="h-[100px] w-full border border-gray-300 rounded-lg overflow-hidden">
              <textarea
                className="w-full h-full p-2 border-none focus:ring-0 resize-none rounded-lg"
                placeholder="Type your message here..."
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
              ></textarea>
            </div>
            {errors.entertainment && (
              <div className="text-red-500 mt-2">{errors.entertainment}</div>
            )}
            <button
              onClick={handleOnclick}
              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg text-white font-semibold shadow-md transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
