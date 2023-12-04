import { useCart } from "../hooks/use-cart";
import { roundPrice } from "../helpers/round-price";
import "./checkout.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const { items, totalItem, totalPrice, totalDiscount } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [province, district] = watch(["province", "district"]);

  const { data: provinces = [], isLoading: isLoadingProvinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      axios.get(`https://provinces.open-api.vn/api/p`).then((res) => res.data),
  });

  const { data: districts = [], isLoading: isLoadingDistricts } = useQuery({
    queryKey: ["districts", { province }],
    queryFn: () =>
      axios
        .get(`https://provinces.open-api.vn/api/p/${province}`, {
          params: {
            depth: 2,
          },
        })
        .then((res) => res.data.districts),
    enabled: !!province,
  });

  const { data: wards = [], isLoading: isLoadingWards } = useQuery({
    queryKey: ["wards", { district }],
    queryFn: () =>
      axios
        .get(`https://provinces.open-api.vn/api/d/${district}`, {
          params: {
            depth: 2,
          },
        })
        .then((res) => res.data.wards),
    enabled: !!district,
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <main className="checkout-page">
      <h1 className="page-heading">Checkout page</h1>
      <div className="customer-form">
        <form
          action=""
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="first-name"
                id="first-name"
                {...register("firstname", {
                  required: "Please enter your firstname",
                })}
              />
              {errors.firstname && <p>{errors.firstname.message}</p>}
            </div>

            <div className="form-field">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="last-name"
                id="last-name"
                {...register("lastname", {
                  required: "Please enter your lastname",
                })}
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="province">Province</label>
              <select
                className="province"
                id="province"
                disabled={isLoadingProvinces}
                {...register("province")}
              >
                <option>Choose province</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="district">District</label>
              <select
                className="district"
                id="district"
                disabled={isLoadingDistricts || !province}
                {...register("district")}
              >
                <option>Choose district</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="ward">Ward</label>
              <select
                className="ward"
                id="ward"
                disabled={isLoadingWards || !district}
                {...register("ward")}
              >
                <option>Choose ward</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="address"
                id="address"
                {...register("address")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="email"
                id="email"
                {...register("email")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="phone"
                id="phone"
                {...register("phone")}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="note">note</label>
              <textarea className="note" id="note" {...register("note")} />
            </div>
          </div>
        </form>
      </div>

      <div className="cart-info">
        <h3 className="cart-info-heading">Cart info</h3>

        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="product">
                <div className="product-thumbnail">
                  <img src={item.product.thumbnail} alt={item.product.title} />
                </div>

                <div className="product-info">
                  <div className="product-title">{item.product.title}</div>
                  <div className="product-quantity">Qty: {item.quantity}</div>
                </div>
              </div>

              <div className="cart-item-price">
                <span className="sale-price">
                  $
                  {roundPrice(
                    item.quantity *
                      (item.product.price -
                        (item.product.price * item.product.discountPercentage) /
                          100),
                  )}
                </span>
                <span className="origin-price">
                  ${item.quantity * item.product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <hr />

        <div className="cart-summary">
          <div className="cart-total-item">Total items: {totalItem}</div>
          <div className="cart-total-price">
            Total price: <del>${roundPrice(totalPrice)}</del>
          </div>
          <div className="cart-discount">
            Total discount: <b>${roundPrice(totalDiscount)}</b>
          </div>
          <div className="cart-price">
            Price: <b>${roundPrice(totalPrice - totalDiscount)}</b>
          </div>
        </div>

        <hr />

        <button onClick={handleSubmit(onSubmit)} className="btn-order">
          Order
        </button>
      </div>
    </main>
  );
}
