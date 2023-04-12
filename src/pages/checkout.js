import Image from "next/image";
import Currency from "react-currency-formatter";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/cartSlice";
import { useSession } from "next-auth/client";

function Checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left side */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://images-na.ssl-images-amazon.com/images/G/01/sns/store/2021update/XCM_Manual_1384932_2019054_4294405_US_1500x300_2X_en_US.jpg"
            alt=""
            width={1020}
            height={250}
            objectFit="contain"
            priority="primary"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Amazon Cart is empty." : "Shopping Cart"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">
                  <Currency />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
