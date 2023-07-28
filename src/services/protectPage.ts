import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

type ProtectedPageHandler = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<{}>>;

const protectPage =
  (handler: ProtectedPageHandler) =>
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{}>> => {
    const session = await getSession(context);

    if (!session) {
      // If the user is not authenticated, redirect them to the sign-in page
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // If the user is authenticated, continue rendering the protected page
    return handler(context);
  };

export default protectPage;
