import { fallbackPropertyImage } from "@/utils/const";
import { TransformedCommunity } from "@/utils/types";
import { FC } from "react";

type CardProps = {
  data: TransformedCommunity;
};

export const Card: FC<CardProps> = ({ data }) => {
  return (
    <div key={data.id} className="border-2 border-slate-400 p-4 flex flex-col">
      <img
        src={data.imgUrl}
        className="mb-4 aspect-video"
        onError={(e) =>
          ((e.target as HTMLImageElement).src = fallbackPropertyImage)
        }
      />
      <div className="mt-auto">
        <h2 className="font-bold">
          Name: <span>{data.name}</span>
        </h2>
        <div>
          Area: <span>{data.group}</span>
        </div>
        <div>
          Average Price: <span>${data.avgPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
