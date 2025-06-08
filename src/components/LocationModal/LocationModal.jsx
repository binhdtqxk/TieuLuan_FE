import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useMapbox from "./useMapBox";

const LocationModal = ({
  open,
  onClose,
  onSelectLocation,
  selectedLocation,
}) => {
  const [searchText, setSearchText] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentLocations, setRecentLocations] = useState([
    { name: "Hà Nội", description: "Hà Nội" },
    {
      name: "Travellive Magazine",
      description:
        "Văn phòng Hà Nội: Tầng 6, Tòa nhà Hoa Cương, Số 18 ngõ 11 Thái Hà, Q. Đống Đa, Hà Nội",
    },
    {
      name: "Aqua-Tots Swim Schools Tây Hồ",
      description: "Lô H3-LC, Khu đô thị Starlake, Bắc Từ Liêm, Hà Nội",
    },
    { name: "Tầng 4 Tháp Hà Nội 49 Hai Bà Trưng", description: "Hà Nội" },
    { name: "Era Tattoo", description: "256A Đặng Tiến Đông, Hanoi, Vietnam" },
    {
      name: "Novotel Hanoi Thai Ha",
      description: "2 Thai Ha, Hanoi, Vietnam 10000",
    },
    {
      name: "Chang Nguyen Makeup & Academy",
      description:
        "Số nhà 66A ngõ 41 Đông Tác, Phường Kim Liên, Quận Đống Đa, Hà Nội, Hanoi, Vietnam",
    },
    { name: "Tp Hồ Chí Minh", description: "Hà Nội" },
  ]);

  // Use our custom Mapbox hook
  const { isLoaded, error, searchPlaces } = useMapbox();

  // Reset search text when modal opens
  useEffect(() => {
    if (open) {
      setSearchText("");
      setLocations([]);
    }
  }, [open]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText) {
        handleSearch(searchText);
      } else {
        setLocations([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, isLoaded]);

  const handleSearch = async (query) => {
    setLoading(true);

    try {
      if (isLoaded) {
        // Use Mapbox Places API to search
        const results = await searchPlaces(query);
        setLocations(results);
      } else {
        // If Mapbox API isn't loaded yet, filter recent locations
        const filteredRecent = recentLocations.filter((location) =>
          location.name.toLowerCase().includes(query.toLowerCase())
        );
        setLocations(filteredRecent);
      }
    } catch (err) {
      console.error("Error searching places:", err);
      // Fall back to recent locations
      const filteredRecent = recentLocations.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setLocations(filteredRecent);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    onSelectLocation(location);
    onClose();
  };

  const handleRemoveLocation = () => {
    onSelectLocation(null);
  };

  const displayLocations = searchText ? locations : recentLocations;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "16px",
          maxHeight: "70vh",
          backgroundColor: "#121212",
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          color: "white",
          backgroundColor: "#121212",
        }}
      >
        <IconButton
          edge="start"
          onClick={onClose}
          aria-label="back"
          sx={{ color: "white" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div
          style={{
            flexGrow: 1,
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Looking for location
        </div>
        <IconButton
          edge="end"
          onClick={onClose}
          aria-label="close"
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "12px 16px",
          backgroundColor: "#121212",
          borderTop: "1px solid #333",
          borderBottom: "1px solid #333",
        }}
      >
        <TextField
          autoFocus
          fullWidth
          placeholder="Bạn đang ở đâu?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
            style: {
              borderRadius: "24px",
              backgroundColor: "#222",
              color: "white",
            },
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#333",
              },
              "&:hover fieldset": {
                borderColor: "#444",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#555",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "gray",
              opacity: 1,
            },
          }}
        />

        {selectedLocation && !searchText && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ ml: 2, mb: 1, color: "#bbb", fontWeight: "medium" }}
              >
                Tagged
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#222",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FmdGoodIcon sx={{ color: "#777", mr: 1 }} />
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: "medium" }}
                    >
                      {selectedLocation.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#999" }}>
                      {selectedLocation.description}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={handleRemoveLocation}
                  sx={{ color: "white" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ ml: 2, mb: 1, color: "#bbb", fontWeight: "medium" }}
            >
              Recommend
            </Typography>
          </>
        )}

        {!searchText && !selectedLocation && (
          <Typography
            variant="body2"
            sx={{ ml: 2, mb: 1, color: "#bbb", fontWeight: "medium" }}
          >
            Recommend
          </Typography>
        )}

        {loading ? (
          <div className="flex justify-center my-4">
            <CircularProgress size={30} sx={{ color: "#1d9bf0" }} />
          </div>
        ) : (
          <List sx={{ p: 0 }}>
            {displayLocations.map((location, index) => (
              <ListItem
                key={index}
                button
                sx={{
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#222",
                  },
                }}
                onClick={() => handleLocationSelect(location)}
              >
                <ListItemIcon sx={{ minWidth: "40px", color: "#777" }}>
                  <FmdGoodIcon />
                </ListItemIcon>
                <ListItemText
                  primary={location.name}
                  secondary={location.description}
                  primaryTypographyProps={{
                    fontWeight: "medium",
                    color: "white",
                  }}
                  secondaryTypographyProps={{ color: "#999" }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
