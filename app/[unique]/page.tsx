import connectMongoDB from "../../libs/mongodb";
import Url from '../../models/Url';
import { notFound, redirect } from 'next/navigation';

type AliasPageProps = {
  params: {
    unique: string;
  };
};

export default async function AliasPage({ params }: AliasPageProps) {
  const { unique } = params;

  await connectMongoDB();
  const data = await Url.findOne({ unique: unique });
  
  if (data) {
    return redirect(data.url);
  } else {
    return redirect("/error/notFound");
  }
  
  
}