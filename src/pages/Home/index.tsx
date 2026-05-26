import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation, Trans } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("app");
  const issues = [
    {
      type: "bug",
      key: "key"
    },
    {
      type: "bug",
      key: "bold"
    },
    {
      type: "bug",
      key: "avatar"
    },
    {
     type: "bug",
      key: "countdown"
    },
    {
      type: "optional",
      key: "language"
    }
  ];
  const renderIcon = (type: string) =>
    type === "bug" ? "🐞" : "⭐";

  return (
    <Box p={2} maxHeight="calc(100vh - 64px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans i18nKey="home.intro" ns="app" components={{ b: <strong/>}}/>
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        <List>
          {issues.map((issue) => (
            <ListItem key={issue.key}>
              <Typography variant="h5" sx={{ p: 2 }}>
                {renderIcon(issue.type)}
              </Typography>
              <ListItemText
                primary={t(`issues.${issue.key}.title`)}
                secondary={t(`issues.${issue.key}.description`)}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default observer(Home);
