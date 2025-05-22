import checkout from "../src/assets/checkout.jpg";

function Checkout() {
  return (
    <div class="relative mx-auto w-full bg-[#BA7F7F]">
      <div class="grid min-h-screen grid-cols-10">
        <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div class="mx-auto w-full max-w-lg">
            <h1
              class="relative text-4xl font-medium text-[#620808] sm:text-3xl"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Secure Checkout
              <span class="mt-2 block h-1 w-10 bg-[#620808] sm:w-20"></span>
            </h1>
            <form action="" class="mt-10 flex flex-col space-y-4">
              <div>
                <label
                  for="email"
                  class="text-xl font-semibold text-[#620808]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.capler@fang.com"
                  class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 text-black px-4 text-sm placeholder-black shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div class="relative">
                <label
                  for="card-number"
                  class="text-xl font-semibold text-[#620808]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Card number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  class="block w-full rounded border-gray-300 text-black bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-black shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
                <img
                  src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                  alt=""
                  class="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div>
                <p
                  class="text-xl font-semibold text-[#620808]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  Expiration date
                </p>
                <div class="mr-6 flex flex-wrap">
                  <div class="my-1">
                    <label for="month" class="sr-only">
                      Select expiration month
                    </label>
                    <select
                      name="month"
                      id="month"
                      class="cursor-pointer rounded border-gray-300 text-black bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Month</option>
                      {[...Array(12)].map((_, index) => {
                        const month = index + 1;
                        const paddedMonth =
                          month < 10 ? `0${month}` : `${month}`;
                        return (
                          <option key={month} value={paddedMonth}>
                            {paddedMonth}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="my-1 ml-3 mr-6">
                    <label for="year" class="sr-only">
                      Select expiration year
                    </label>
                    <select
                      name="year"
                      id="year"
                      class="cursor-pointer rounded border-gray-300 text-black bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Year</option>
                      {[...Array(11)].map((_, index) => {
                        const year = 2025 + index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="relative my-1">
                    <label for="security-code" class="sr-only">
                      Security code
                    </label>
                    <input
                      type="text"
                      id="security-code"
                      name="security-code"
                      placeholder="Security code"
                      class="block w-36 rounded border-gray-300  text-black bg-gray-50 py-3 px-4 text-sm placeholder-black shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label for="card-name" class="sr-only ">
                  Card name
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Name on the card"
                  class="mt-1 block w-full rounded border-gray-300 text-black placeholder-black bg-gray-50 py-3 px-4 text-sm  shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </form>
            <p
              class="mt-10 text-center text-sm font-semibold text-gray-500"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              By placing this order you agree to the{" "}
              <a
                href="#"
                class="whitespace-nowrap text-blue-500 underline hover:text-teal-600"
              >
                Terms and Conditions
              </a>
            </p>
            <button
              type="submit"
              class="mt-4 inline-flex w-full items-center justify-center rounded bg-[#620808] py-2.5 px-4 text-base font-semibold tracking-wide text-[#dbd5c5] text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              style={{ fontFamily: "Inknut Antiqua" }}
            >
              Place Order
            </button>
          </div>
        </div>
        <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 class="sr-only">Order summary</h2>
          <div>
            <img
              src={checkout}
              alt=""
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-red-500 to-red-300 opacity-60"></div>
          </div>
          <div class="relative">
            <ul class="space-y-5">
              <li class="flex justify-between">
                <div class="inline-flex">
                  <div class="ml-3" style={{ fontFamily: "Inknut Antiqua" }}>
                    <p class="text-lg font-semibold text-[#dbd5c5]">
                      Nano Titanium Hair Dryer
                    </p>
                    <p class="text-md font-medium text-[#dbd5c5] text-opacity-80">
                      Pdf, doc Kindle
                    </p>
                  </div>
                </div>
                <p
                  class="text-lg font-semibold text-[#dbd5c5]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  $260.00
                </p>
              </li>
              <li class="flex justify-between">
                <div class="inline-flex">
                  <div class="ml-3" style={{ fontFamily: "Inknut Antiqua" }}>
                    <p class="font-semibold text-lg text-[#dbd5c5]">
                      Luisia H35
                    </p>
                    <p class="text-md font-medium text-[#dbd5c5] text-opacity-80">
                      Hair Dryer
                    </p>
                  </div>
                </div>
                <p
                  class="text-lg font-semibold text-[#dbd5c5]"
                  style={{ fontFamily: "Inknut Antiqua" }}
                >
                  $350.00
                </p>
              </li>
            </ul>
            <div class="my-5 h-0.5 w-full bg-[#FBE7B2] bg-opacity-30"></div>
            <div class="space-y-2">
              <p
                class="flex justify-between text-lg font-bold text-[#dbd5c5]"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                <span>Total price:</span>
                <span style={{ fontFamily: "Inknut Antiqua" }}> $510.00</span>
              </p>
              <p
                class="flex justify-between text-md font-medium text-[#dbd5c5]"
                style={{ fontFamily: "Inknut Antiqua" }}
              >
                <span>Vat: 10%</span>
                <span>$55.00</span>
              </p>
            </div>
          </div>
          <div
            class="relative mt-10 text-[#dbd5c5]"
            style={{ fontFamily: "Inknut Antiqua" }}
          >
            <h3 class="mb-5 text-2xl font-bold">Support</h3>
            <p class="text-md font-semibold">
              +01 653 235 211 <span class="font-light">(International)</span>
            </p>
            <p class="mt-1 text-md font-semibold">
              support@nanohair.com <span class="font-light">(Email)</span>
            </p>
            <p class="mt-2 text-sm font-medium">
              Call us now for payment related issues
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
