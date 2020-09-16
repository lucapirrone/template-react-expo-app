import { API } from "aws-amplify";


export async function getCoupons() {
  let coupons = await API.get("coupons", "/coupons");
  console.log(coupons);
  return coupons;
}
export async function addCoupon(coupon) {
  let _coupon = await API.post("coupons", "/coupons", {
    body: coupon
  });
  console.log(_coupon);
  return _coupon;
}
