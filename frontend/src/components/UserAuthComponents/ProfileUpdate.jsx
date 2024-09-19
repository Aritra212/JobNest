import { useForm } from "react-hook-form";
import Input from "./Input";

function ProfileUpdate() {
  const { register, handleSubmit } = useForm();

  return (
    <div
      className={`mx-auto w-fit p-5 bg-gray-100 rounded-xl  flex justify-center items-center box-border`}
    >
      <div>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit()}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Phone Number: "
              placeholder="Enter your phone number"
              {...register("phone", {
                required: true,
              })}
            />

            <div className="flex justify-between">
              <button
                type="submit"
                className="w-[150px] py-1 rounded-md bg-indigo-700 text-white font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[150px] py-1 rounded-md bg-indigo-700 text-white font-bold"
              >
                Update details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;
