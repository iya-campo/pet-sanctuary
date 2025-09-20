import { Container } from "@mui/material";
import GlobalHeader from "./GlobalHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
          <Container>
            <GlobalHeader />
          </Container>
      </header>
      <main>{children}</main>
    </div>
  );
}
