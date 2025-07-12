import { useQuery } from "@tanstack/react-query";
import TitleSection from "../../components/shared/TitleSection";
import { useAuth } from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SkeletenLoader from "../../components/shared/SkeletonLoader";
import type { IPaymentHistory } from "../../types/propsTypes";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  console.log(payments.length);

  if (isPending) {
    return <SkeletenLoader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section>
      <div>
        <TitleSection heading="Payment History" subheading="check it out" />
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className="">
                <th>Email</th>
                <th>Transaction Id</th>
                <th>Total Price</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment: IPaymentHistory) => (
                <tr key={payment._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{payment.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.price}</td>
                  <th>
                    <button className="btn btn-warning text-base text-black btn-xs hover:text-white border-0">
                      {payment.status}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr className="">
                <th></th>
                <th className="font-black text-bold text-lg">Total:</th>
                <th className="font-black badge badge-xl mt-2 text-amber-500 ">
                  ${" "}
                  {payments?.reduce(
                    (sum: number, item: IPaymentHistory): number =>
                      Number(sum) + Number(item.price),
                    0
                  )}
                </th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;
