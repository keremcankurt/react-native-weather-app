import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const Api_key = "5c86490ff1685b81ccc2dcc182a48a32";
export default function App() {
  const [apiData, setApiData] = useState(null);
  const [search, setSearch] = useState("");
  const [showWeather, setShowWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];
  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          // ARRAY OF OBJ
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <View className=" h-screen flex flex-col items-center justify-center gap-5">
      <View className="bg-white w-80 p-4 rounded-md">
        <View className="flex flex-row items-center justify-between gap-2">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Enter Your Location"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
          />
          <TouchableOpacity onPress={fetchWeather}>
            <Image
              source={{uri: "https://cdn-icons-png.flaticon.com/512/758/758651.png"}}
              alt="..."
              className="w-8 h-8"
            />
          </TouchableOpacity>
        </View>
      </View>
        <View
          className={`bg-white w-80 rounded-md flex items-center justify-center 
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (
            <View className="grid place-items-center h-full justify-center">
              <Image
                source={{uri: "https://cdn-icons-png.flaticon.com/512/1477/1477009.png"}}
                alt="..."
                className="w-14 h-14 mx-auto mb-2 animate-spin"
              />
            </View>
          ) : (
            showWeather && (
              <View className="text-center flex flex-col gap-6 items-center">
                {apiData && (
                  <Text className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </Text>
                )}
                <Image
                  source={{uri: showWeather[0]?.img}}
                  alt="..."
                  className="w-52 h-52 mx-auto"
                />
                <Text className="text-xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </Text>

                {apiData && (
                  <>
                    <View className="flex flex-row justify-center items-center">
                      <Image
                        source={{uri: "https://cdn-icons-png.flaticon.com/512/7794/7794499.png"}}
                        alt="..."
                        className="h-9 w-9 mt-1"
                      />
                      <Text className="text-2xl font-extrabold">
                        {apiData?.main?.temp}&#176;C
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )
          )}
        </View>
        <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
