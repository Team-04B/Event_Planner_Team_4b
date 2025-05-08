"use server";
export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      method: "GET",
      credentials: "include",
    },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};


