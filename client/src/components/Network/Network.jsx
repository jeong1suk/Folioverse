import { useAxiosGet } from "../../CustomHooks";
import "./Network.css";
import NetworkProfile from "./NetworkProfile";
const host = import.meta.env.VITE_SERVER_HOST;

function Network() {
  const { data, error, loading } = useAxiosGet(`${host}/dummy/network`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='network-center-frame'>
      <div className='network-container'>
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {/* ---테스트용--- */}

        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {data.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
        {/* ---테스트용--- */}
      </div>
    </div>
  );
}

export default Network;
