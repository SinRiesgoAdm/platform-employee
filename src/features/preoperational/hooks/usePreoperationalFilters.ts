import { useSearchParams } from 'react-router';
import { getTodayDate } from '@/features/preoperational/utils/date.ts';

const DATE_PARAM = 'date';
const VEHICLE_PARAM = 'vehicle';

export const usePreoperationalFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const date = searchParams.get(DATE_PARAM) || getTodayDate();
    const vehicleParam = Number(searchParams.get(VEHICLE_PARAM));
    const vehicleId =
        Number.isInteger(vehicleParam) && vehicleParam > 0
            ? vehicleParam
            : undefined;

    const setParam = (name: string, value: string) => {
        setSearchParams((prev) => {
            prev.set(name, value);
            return prev;
        });
    };

    return {
        date,
        vehicleId,
        setDate: (value: string) => setParam(DATE_PARAM, value),
        setVehicleId: (value: number) => setParam(VEHICLE_PARAM, String(value)),
    };
};
