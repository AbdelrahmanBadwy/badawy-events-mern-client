import { Button, ConfigProvider } from "antd";
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#2970ff", borderRedius: 2 },
        components: {
          Button: {
            controlHeight: 45,
            controlOutline: "none",
          },
          Input: {
            controlHeight: 45,
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
