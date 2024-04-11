"use client";
import React from "react";
import { BreadcrumbDashboard } from "@/components/common/breadcrumb";
import { SubscriptionForm } from "@/components/payment/SubscriptionForm";
import { SubscriptionList } from "@/components/payment/SubscriptionList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51P1KWoP7TXZ8NwywIhuRHlcpOUL2PGQRv2owp1AYQhUQ8y2y9n44Ybj4vjFr0YX4KZ4cVQWDzLDiChhwsgj1mzQc00qR1FqHyK"); // starts with pk_


export default function SubscriptionssPage() {
    return (
        <Elements stripe={stripePromise}>
            <div className="px-12 py-16">
                <BreadcrumbDashboard />
                <SubscriptionList />
            </div>
        </Elements>

    );
}
