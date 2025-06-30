"use client";

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addressApi } from "@redux/api/addressApi";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  Home,
  MapIcon,
  MapPin,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  isDefault: boolean;
  type: "home" | "office" | "other";
  coordinates?: { lat: number; lng: number };
}

interface Props {
  open: boolean;
  onClose: () => void;
  dataAddresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}

export default function AddressDialog({
  dataAddresses,
  open,
  onClose,
  selectedAddress,
  setSelectedAddress,
}: Props) {
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    name: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    isDefault: false,
    type: "home",
  });
  const { data: provinces = [] } = addressApi.useGetProvincesQuery();
  const { data: districts = [] } = addressApi.useGetDistrictsQuery(
    Number(newAddress.province), // phải ép kiểu số vì backend yêu cầu ID
    { skip: !newAddress.province }, // không gọi nếu chưa có tỉnh
  );
  const { data: wards = [] } = addressApi.useGetWardsQuery(
    Number(newAddress.district),
    { skip: !newAddress.district },
  );

  const handleConfirm = () => {
    if (isAddingNew) {
      const newId = Date.now();
      const fullAddress = { ...newAddress, id: newId };

      setSelectedAddress(fullAddress);
      setIsAddingNew(false);
    }
    onClose();
  };

  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    toast.success("Địa chỉ đã được lưu thành công!");
    setIsAddingNew(false);
  };

  const handleProvinceChange = (value: string) => {
    setNewAddress({
      ...newAddress,
      province: value,
      district: "",
      ward: "",
    });
    console.log("Selected Province:", value);
  };

  const handleDistrictChange = (value: string) => {
    setNewAddress({
      ...newAddress,
      district: value,
      ward: "",
    });
    console.log("Selected District:", value);
  };

  const handleWardChange = (value: string) => {
    setNewAddress({
      ...newAddress,
      ward: value,
    });
    console.log("Selected Ward:", value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          color: "white",
          padding: "24px",
          borderBottom: "none",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/20 p-2">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" className="font-bold text-white">
              Chọn địa chỉ giao hàng
            </Typography>
            <Typography variant="body2" className="mt-1 text-white/80">
              Quản lý và chọn địa chỉ giao hàng của bạn
            </Typography>
          </div>
        </div>
      </DialogTitle>

      <DialogContent sx={{ padding: "32px", backgroundColor: "#fafafa" }}>
        {!isAddingNew && (
          <div>
            <div
              className="my-2 space-y-3"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "8px",
              }}
            >
              {dataAddresses.map((address, index) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    type="button"
                    className={`w-full cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                      selectedAddress.id === address.id
                        ? "border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 shadow-md ring-2 ring-orange-100"
                        : "border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm"
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 text-left">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Typography
                            variant="subtitle1"
                            className="text-sm font-bold text-gray-800"
                          >
                            {address.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {address.phone}
                          </Typography>
                          <Chip
                            label={
                              address.type === "home"
                                ? "Nhà riêng"
                                : address.type === "office"
                                  ? "Văn phòng"
                                  : "Khác"
                            }
                            size="small"
                            icon={
                              address.type === "home" ? (
                                <Home className="h-3 w-3" />
                              ) : (
                                <Building2 className="h-3 w-3" />
                              )
                            }
                            sx={{
                              backgroundColor:
                                address.type === "home"
                                  ? "#e3f2fd"
                                  : address.type === "office"
                                    ? "#f3e5f5"
                                    : "#fff3e0",
                              color:
                                address.type === "home"
                                  ? "#1976d2"
                                  : address.type === "office"
                                    ? "#7b1fa2"
                                    : "#f57c00",
                              fontWeight: 600,
                              fontSize: "10px",
                              height: "20px",
                              "& .MuiChip-icon": {
                                color:
                                  address.type === "home"
                                    ? "#1976d2"
                                    : address.type === "office"
                                      ? "#7b1fa2"
                                      : "#f57c00",
                              },
                            }}
                          />
                          {address.isDefault && (
                            <Chip
                              label="Mặc định"
                              size="small"
                              sx={{
                                backgroundColor: "#e8f5e8",
                                color: "#2e7d32",
                                fontWeight: 700,
                                border: "1px solid #4caf50",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          )}
                        </div>

                        <Typography
                          variant="body2"
                          className="mb-2 text-sm leading-relaxed text-gray-700"
                        >
                          {address.address}, {address.ward}, {address.district},{" "}
                          {address.province}
                        </Typography>

                        {address.coordinates && (
                          <div className="flex inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-600">
                            <MapIcon className="h-3 w-3" />
                            <span className="font-medium">
                              Đã xác minh vị trí
                            </span>
                          </div>
                        )}
                      </div>

                      {selectedAddress.id === address.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          <div className="rounded-full bg-orange-500 p-1.5">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dataAddresses.length * 0.1 + 0.2 }}
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Plus className="h-5 w-5" />}
                onClick={() => {
                  setIsAddingNew(true);
                  setNewAddress({
                    id: 0,
                    name: "",
                    phone: "",
                    address: "",
                    ward: "",
                    district: "",
                    province: "",
                    isDefault: false,
                    type: "home",
                  });
                }}
                sx={{
                  mt: 4,
                  py: 2,
                  borderRadius: "12px",
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: "#ff6b35",
                  color: "#ff6b35",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#f7931e",
                    backgroundColor: "#fff7f0",
                    borderStyle: "dashed",
                  },
                }}
              >
                Thêm địa chỉ mới
              </Button>
            </motion.div>
          </div>
        )}

        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-6">
              <Typography variant="h6" className="mb-2 font-bold text-gray-800">
                Thêm địa chỉ mới
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Điền thông tin địa chỉ giao hàng mới của bạn
              </Typography>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextField
                  label="Họ tên người nhận"
                  fullWidth
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "#ff6b35",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff6b35",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff6b35",
                    },
                  }}
                />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": {
                        borderColor: "#ff6b35",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff6b35",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff6b35",
                    },
                  }}
                />
              </div>

              <TextField
                label="Địa chỉ cụ thể (số nhà, tên đường...)"
                fullWidth
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": {
                      borderColor: "#ff6b35",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff6b35",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ff6b35",
                  },
                }}
              />

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormControl fullWidth>
                  <InputLabel
                    id="province-label"
                    sx={{
                      "&.Mui-focused": {
                        color: "#ff6b35",
                      },
                    }}
                  >
                    Tỉnh/Thành phố
                  </InputLabel>
                  <Select
                    labelId="province-label"
                    value={newAddress.province}
                    label="Tỉnh/Thành phố"
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    sx={{
                      borderRadius: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "12px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff6b35",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff6b35",
                      },
                    }}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel
                    id="district-label"
                    sx={{
                      "&.Mui-focused": {
                        color: "#ff6b35",
                      },
                    }}
                  >
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="district-label"
                    value={newAddress.district}
                    label="Quận/Huyện"
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!newAddress.province}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel
                    id="ward-label"
                    sx={{
                      "&.Mui-focused": {
                        color: "#ff6b35",
                      },
                    }}
                  >
                    Phường/Xã
                  </InputLabel>
                  <Select
                    labelId="ward-label"
                    value={newAddress.ward}
                    label="Phường/Xã"
                    onChange={(e) => handleWardChange(e.target.value)}
                    disabled={!newAddress.district}
                    sx={{
                      borderRadius: "12px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "12px",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff6b35",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff6b35",
                      },
                    }}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward.id} value={ward.id}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          padding: "24px 32px",
          backgroundColor: "#fafafa",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {isAddingNew ? (
          <>
            <Button
              onClick={() => setIsAddingNew(false)}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                color: "#666",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Trở lại
            </Button>
            <Button
              onClick={handleSaveAddress}
              variant="contained"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f7931e 0%, #ff6b35 100%)",
                  boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
                },
              }}
            >
              Lưu địa chỉ
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onClose}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                color: "#666",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
                boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f7931e 0%, #ff6b35 100%)",
                  boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
                },
              }}
            >
              Xác nhận
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
