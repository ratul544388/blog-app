import { getBlogs } from "@/actions/get-blogs";
import { getCurrentUser } from "@/lib/get-current-user";

const PopularBlogs = async () => {
  const initialBlogs = await getBlogs({});
  const currentUser = await getCurrentUser();
  return (
    <div>

    </div>
  );
};

export default PopularBlogs;
