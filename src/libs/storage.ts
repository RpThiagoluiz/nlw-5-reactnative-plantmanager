import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

export interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
}

interface StoragePlantProps {
  //Chave do objeto vai vim assim, q ele vem pra salver no storage lembra.
  [id: string]: {
    data: PlantsProps;
  };
}

export const savePlantInStorage = async (plant: PlantsProps): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem("@nlw#5_rn_plantManager:plants");
    //Se tiver ele tras se nao ele traz um obj vazio
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: { data: plant },
    };

    //Vai manter oq tem, e adicionar um novo.
    await AsyncStorage.setItem(
      "@nlw#5_rn_plantManager:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    //Jogar o erro pra frente pra uma outra interface
    throw new Error(error);
  }
};

export const loadPlantsInStorage = async (): Promise<PlantsProps[]> => {
  try {
    const data = await AsyncStorage.getItem("@nlw#5_rn_plantManager:plants");
    //Se tiver ele tras se nao ele traz um obj vazio
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    //Jogar o erro pra frente pra uma outra interface
    throw new Error(error);
  }
};
