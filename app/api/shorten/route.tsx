import connectMongoDB from "../../../libs/mongodb";
import Url from "../../../models/Url";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request) {
  try {
    const requestData = await request.json();

    if (!requestData || !requestData.url) {
      return NextResponse.json(
        { message: "Missing or invalid 'url' parameter" },
        { status: 400 }
      );
    }

    const { url, customUnique } = requestData;
    let unique;

    if (customUnique) {
      const existingUrl = await Url.findOne({ unique: customUnique });

      if (existingUrl) {
        return NextResponse.json(
          { message: "Custom unique already exists" },
          { status: 400 }
        );
      }

      unique = customUnique;
    } else {
      unique = nanoid(6);
    }

    const timestamp = new Date();
    const clicked = 0;

    await connectMongoDB();
    await Url.create({ unique, url, clicked, timestamp });

    return NextResponse.json(
      { message: "Url Created Successfully", id: unique },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON data" }, { status: 400 });
  }
}
