import React from "react";
import { useGetAreasQuery } from "../../redux/area/areaApiSlice";
import LoadingScreen from "../LoadingScreen";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAreaId, setSelectedAreaId } from "../../redux/area/areaSlice";

const Sidebar = () => {
  const selectedAreaId = useSelector(selectAreaId);

  const { data: areas, isLoading, isError } = useGetAreasQuery();
  console.log(areas);

  const dispatch = useDispatch();
  const handleSelectArea = (areaId) => {
    dispatch(setSelectedAreaId({ areaId }));
  };
  let content;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    content = <Typography>Something wrong, please try again</Typography>;
  } else {
    if (areas.ids.length) {
      content = (
        <>
          {!selectedAreaId ? (
            <Typography variant="h2" sx={{ fontSize: "1rem", mb: "8px" }}>
              Đầu tiên, bạn phải chọn khu vực:
            </Typography>
          ) : null}
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Typography variant="h2" sx={{ fontSize: "1rem" }}>
              Khu vực:
            </Typography>

            <ButtonGroup variant="contained" aria-label="Area list">
              {areas.ids.map((id, i) => (
                <Button
                  key={i}
                  sx={{
                    backgroundColor: (theme) =>
                      selectedAreaId === areas.entities[id].id
                        ? theme.palette.info.light
                        : theme.palette.info.main,
                  }}
                  onClick={() => handleSelectArea(areas.entities[id].id)}
                >
                  {areas.entities[id].name}
                </Button>
              ))}
            </ButtonGroup>
          </Stack>
        </>
      );
    } else {
      content = <Typography>Bạn không sở hữu khu vực nào</Typography>;
    }
  }
  return content;
};

export default Sidebar;
