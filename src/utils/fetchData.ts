import communitiesData from "@/mock/communities";
import homesData from "@/mock/homes";
import { Community, Home, TransformedCommunity } from "@/utils/types";

const baseURL = "https://storage.googleapis.com/openhouse-ai-fe-coding-test";

const calculateAverageHomePricePerCommunity = (
  communities: Community[],
  homes: Home[]
): TransformedCommunity[] => {
  return communities.map((community) => {
    const homeData = homes.reduce((object, home: Home) => {
      const communityId = home.communityId;
      if (!object[communityId]) {
        object[communityId] = {
          totalHomePrice: home.price,
          totalNumberOfHome: 1,
        };

        return object;
      }

      object[communityId].totalHomePrice += home.price;
      object[communityId].totalNumberOfHome += 1;
      return object;
    }, {} as { [key: string]: { totalHomePrice: number; totalNumberOfHome: number } });

    return {
      ...community,
      avgPrice:
        homeData[community.id]?.totalHomePrice /
        homeData[community.id]?.totalNumberOfHome,
    };
  });
};

const reorderCommunities = (communitiesData: Community[]): Community[] => {
  return communitiesData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

const filerInvalidCommunities = (
  communitiesData: (Community & { avgPrice: number })[]
): TransformedCommunity[] => {
  return communitiesData.filter((community) => {
    if (!community.avgPrice || !community.imgUrl || !community.name)
      return false;

    return true;
  });
};

const transformCommunitiesData = (
  communitiesData: Community[],
  homesData: Home[]
): TransformedCommunity[] => {
  const orderedCommunities = reorderCommunities(communitiesData);

  const communitiesWithAvgPrice = calculateAverageHomePricePerCommunity(
    orderedCommunities,
    homesData
  );

  return filerInvalidCommunities(communitiesWithAvgPrice);
};

export const fetchData = async (): Promise<{
  communities: TransformedCommunity[];
  homes: Home[];
}> => {
  try {
    //   const communities = await fetch(`${baseURL}/communities.json`);
    //   const homes = await fetch(`${baseURL}/homes.json`);

    return Promise.resolve({
      communities: transformCommunitiesData(communitiesData, homesData),
      homes: homesData,
    });
  } catch (e) {
    console.error(e);
    throw new Error(e as string);
  }
};
