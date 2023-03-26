import React from "react";
import { useParams } from "react-router-dom";

export default function DetailItem() {
    const { _id } = useParams();

    return <span>{_id} Detail</span>;
}
