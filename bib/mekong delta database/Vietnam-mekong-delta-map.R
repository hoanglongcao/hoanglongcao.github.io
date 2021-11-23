# Load geojsonio library
library(geojsonio)

# Load geojson from files
spdf_cambodia <- geojson_read("cambodia_provinces.geojson",  what = "sp")
spdf_vietnam <- geojson_read("vietnam_provinces.geojson",  what = "sp")
spdf_vietnam_rivers <- geojson_read("vietnam_rivers.geojson",  what = "sp")


# List of Vietnamese Mekong Delta Province
vmd_provinces <- c("An Giang", "Dong Thap", "Bac Lieu", "Can Tho", "Hau Giang",
                   "Ben Tre", "Tien Giang", "Long An", "Ca Mau", "Tra Vinh",
                   "Kien Giang", "Vinh Long", "Soc Trang")
# Vietnamse Mekong Delta provinces
spdf_vmd <-  spdf_vietnam[FALSE,]

for(i in 1:length(vmd_provinces)) {
  spdf_vmd <- rbind.SpatialPolygonsDataFrame(spdf_vmd, spdf_vietnam[spdf_vietnam$Name_EN==vmd_provinces[i],])
}

# Load broom library
library(broom)
# 'fortify' the data to get a dataframe format required by ggplot2
spdf_fortified_cambodia <- tidy(spdf_cambodia)
spdf_fortified_vietnam <- tidy(spdf_vietnam)
spdf_fortified_vmd <- tidy(spdf_vmd)
spdf_fortified_vietnam_rivers <- tidy(spdf_vietnam_rivers)

# Load ggplot2 library
library(ggplot2)

#Plot
ggplot() +
  geom_polygon(data = spdf_fortified_cambodia, aes( x = long, y = lat, group = group), fill="#dfdedaff", color="#4484a5ff") +
  geom_polygon(data = spdf_fortified_vietnam, aes( x = long, y = lat, group = group), fill="#adb09aff", color="#4484a5ff")+
  geom_polygon(data = spdf_fortified_vmd, aes( x = long, y = lat, group = group), fill="#fefbe6ff", color="#4484a5ff")+
  geom_path(data = spdf_fortified_vietnam_rivers, aes( x = long, y = lat, group = group), fill=NA, color="blue")+
  coord_map(xlim = c(103.9, 107.5),ylim = c(8.5, 11))+
  theme_void()+
  theme(panel.background = element_rect(fill = "#c4e6efff")) # sea