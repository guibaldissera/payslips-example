import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { PayslipListScreen } from "./index";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  Stack: {
    Screen: ({ children }: { children: React.ReactNode }) => children,
  },
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("../../api/useFetchPayslips", () => ({
  useFetchPayslips: jest.fn(() => ({
    data: [
      {
        id: "1",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
        file: "payslip-1.png",
      },
      {
        id: "2",
        fromDate: "2024-02-01",
        toDate: "2024-02-29",
        file: "payslip-2.png",
      },
      {
        id: "3",
        fromDate: "2024-03-01",
        toDate: "2024-03-31",
        file: "payslip-3.png",
      },
    ],
    loading: false,
    refetch: jest.fn(),
  })),
}));

describe("PayslipListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the payslip list correctly", async () => {
    const { getByText, getAllByText } = render(<PayslipListScreen />);

    await waitFor(() => {
      expect(getByText("ID: 1")).toBeTruthy();
      expect(getByText("ID: 2")).toBeTruthy();
      expect(getByText("ID: 3")).toBeTruthy();
    });

    const payslipItems = getAllByText(/ID: \d/);
    expect(payslipItems).toHaveLength(3);
    expect(payslipItems.map((item) => item.props.children)).toMatchSnapshot();
  });

  it("should navigate to details screen when pressing a payslip item", async () => {
    const { getByText } = render(<PayslipListScreen />);

    await waitFor(() => {
      expect(getByText("ID: 1")).toBeTruthy();
    });

    const firstItem = getByText("ID: 1");
    fireEvent.press(firstItem);

    expect(mockPush).toHaveBeenCalledWith("/details?id=1");
  });

  it("should navigate to correct details screen for different items", async () => {
    const { getByText } = render(<PayslipListScreen />);

    await waitFor(() => {
      expect(getByText("ID: 2")).toBeTruthy();
    });

    const secondItem = getByText("ID: 2");
    fireEvent.press(secondItem);

    expect(mockPush).toHaveBeenCalledWith("/details?id=2");
  });
});
