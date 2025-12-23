import { useEffect, useState } from "react";
import { Autocomplete, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  searchUsersThunk,
  searchMembersThunk,
} from "../../store/thunks/userThunks";
import { clearUserSearch } from "../../store/slices/userSlice";
import type { User, UserSearchScope } from "../../types/user";
import { AppTextField } from "../TextFields/AppTextField";

interface Props {
  companyId: string;
  value: User[];
  onChange: (users: User[]) => void;
  scope?: UserSearchScope;
}

export function UserSearchAutocomplete({
  companyId,
  value,
  onChange,
  scope = "users",
}: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const users = useAppSelector((s) => s.users.search);
  const loading = useAppSelector((s) => s.users.searchLoading);

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 350);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      if (scope === "members") {
        dispatch(
          searchMembersThunk({
            query: debouncedValue,
            companyId,
          })
        );
      } else {
        dispatch(
          searchUsersThunk({
            query: debouncedValue,
            companyId,
          })
        );
      }
    } else {
      dispatch(clearUserSearch());
    }
  }, [debouncedValue, companyId, scope, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearUserSearch());
    };
  }, [dispatch]);

  return (
    <Autocomplete
      multiple
      options={users}
      loading={loading}
      value={value}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      onChange={(_, v) => onChange(v)}
      filterSelectedOptions
      isOptionEqualToValue={(o, v) => o.id === v.id}
      getOptionLabel={(option) =>
        option.username ? `${option.username} (${option.email})` : option.email
      }
      slotProps={{
        popupIndicator: { sx: { display: "none" } },
      }}
      renderInput={(params) => (
        <AppTextField
          {...params}
          label={t("search.name")}
          placeholder={t("search.user.placeholder")}
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={18} sx={{ mr: 1 }} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
