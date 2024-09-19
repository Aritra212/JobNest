import SubscriptionCard from "../components/Cards/SubscriptionCard";
import axios from "axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import Razorpay from "razorpay";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf.js";
import { useTranslation } from "react-i18next";

function Subscriptions() {
  const { t } = useTranslation(["user", "common"]);

  const subscriptions = [
    {
      title: t("subscribe.titles.t1"),
      category: "free",
      amount: 0.0,
      features: [t("subscribe.features.f1")],
    },
    {
      title: t("subscribe.titles.t2"),
      category: "bronze",
      amount: 100.0,
      features: [t("subscribe.features.f2")],
    },
    {
      title: t("subscribe.titles.t3"),
      category: "silver",
      amount: 300.0,
      features: [t("subscribe.features.f3")],
    },
    {
      title: t("subscribe.titles.t4"),
      category: "gold",
      amount: 1000.0,
      features: [t("subscribe.features.f4")],
    },
  ];

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [coupon, setCupon] = useState("");
  const [offer, setOffer] = useState(5);
  const [activeMode, setActivemode] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const authStatus = useSelector((state) => state.auth.status);
  const userId = useSelector((state) =>
    authStatus ? state.auth.userData.id : null
  );
  const emailId = useSelector((state) =>
    authStatus ? state.auth.userData.email : null
  );
  const navigate = useNavigate();

  const handlePayment = () => {
    if (coupon && !offer) {
      alert("Please select discount value from dropdown");
    } else if (coupon && offer) {
      axios
        .post(`${conf.backendURL}/payment/offer`, {
          coupon,
          amt:
            (selectedPlan === "bronze" && 100) ||
            (selectedPlan === "silver" && 300) ||
            (selectedPlan === "gold" && 1000),
          offer,
        })
        .then((res) => {
          alert(res.data.message);
          console.log(res);
          handlePaymentGateway(selectedPlan, res.data.data.discountedamt);
          setActivemode("");
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };
  const handlePaymentGateway = async (p, discountedamt = -1) => {
    if (!userId) {
      alert("User Id Not Found! Login to your account first");
      navigate("/login");
    } else if (!emailId) {
      alert("Email not found! Update profile or login");
      navigate("/updateProfile");
    } else {
      try {
        if (p === "free") {
          await axios
            .post(`${conf.backendURL}/payment/free`, {
              email: emailId,
              userId,
            })
            .then((res) => {
              console.log(res);
              alert(res.data.message);
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data.message);
            });
        } else {
          const res = await axios.post(
            `${conf.backendURL}/payment/create-order`,
            {
              plan: p,
              discountedamt,
            }
          );
          const { orderId, amount, internshipLimit, plan } = res.data;

          const options = {
            key_id: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount,
            currency: "INR",
            name: "Subscription",
            description: `Subscription to ${plan}`,
            order_id: orderId,
            handler: async (response) => {
              // console.log(response);
              await axios
                .post(`${conf.backendURL}/payment/verify-order`, {
                  razorpay_paymentID: response.razorpay_payment_id,
                  razorpay_orderID: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  plan,
                  email: emailId,
                  userId,
                  amount,
                  internshipLimit,
                })
                .then((res) => res.status == 200 && setPaymentStatus(true));
            },
            prefill: {
              emailId,
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } catch (err) {
        console.log("Error in payment", err);
        alert("Error in payment!!" + err.response.data);
      }
    }
  };

  useEffect(() => {
    if (paymentStatus) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatus]);

  return (
    <div className="w-full">
      {activeMode === "" && (
        <div className="w-4/5 xl:w-fit h-[calc(100vh-80px)] flex  items-center overflow-x-scroll gap-3 mx-auto">
          {subscriptions?.map((el) => (
            <SubscriptionCard
              key={el.title}
              title={el.title}
              amount={el.amount}
              features={el.features}
              category={el.category}
              btnFun={() => {
                setSelectedPlan(el.category);
                el.category === "free"
                  ? handlePaymentGateway(el.category)
                  : setActivemode("coupon");
              }}
            />
          ))}
        </div>
      )}
      {activeMode === "coupon" && (
        <div className="w-full h-screen bg-[#2d2c2cd4] fixed top-0 z-200 flex justify-center items-center">
          <div className="w-[300px] md:w-[500px] h-[300px] bg-white rounded-lg text-black p-3 flex items-center justify-center">
            <div>
              <div>
                <p className="font-bold md:text-xl text-center">
                  {t("subscribe.titles.t5")}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center h-[200px] gap-2">
                <p>{t("labels.coupon")}</p>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCupon(e.target.value)}
                  className="border-solid border-2 border-gray-500 rounded"
                />
                <div>
                  <label htmlFor="des">{t("labels.offer")} : </label>
                  <select
                    id="des"
                    name="offer"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    className="py-1 px-2 border-solid border-2 border-gray-500 rounded"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                        className="bg-indigo-700 text-white text-xs"
                      >
                        {i + 1} %
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="w-full mt-3 h-fit flex text-indigo-700 text-xs font-bold cursor-pointer"
                  onClick={() => handlePaymentGateway(selectedPlan)}
                >
                  {t("subscribe.titles.t6")}
                </div>
                <div className="w-full flex justify-between mt-2 items-center">
                  <div
                    className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-4 py-1 rounded-md cursor-pointer"
                    onClick={() => {
                      setActivemode("");
                    }}
                  >
                    {t("common:cancel")}
                  </div>
                  <div
                    className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
                    onClick={handlePayment}
                  >
                    {t("common:ok")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
