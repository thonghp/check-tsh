import { getContentMainNumber } from "./contentMainNumber.js";
import { getContentOccurrenceNumber } from "./contentNumber.js";
import { completedArrows, emptyArrows } from "./contentArrows.js";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("birthDate");

// Hàm tính tổng các chữ số
function calculateSum(dateString) {
  const digits = dateString.replace(/\D/g, "");
  let sum = 0;
  for (let char of digits) {
    sum += parseInt(char);
  }
  return sum;
}

// Tính số chủ đạo theo quy tắc Thần số học
function mainNumber(num) {
  if (num === 11 || num === 22 || num === 10) {
    return num;
  }
  while (num > 11) {
    num = num
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);

    if (num === 11 || num === 22 || num === 10) {
      return num;
    }
  }
  return num;
}

// Hàm đếm số lần xuất hiện của từng chữ số
function countDigits(dateString) {
  const digits = dateString.replace(/\D/g, "");
  const countMap = {};
  for (let char of digits) {
    if (countMap[char]) {
      countMap[char] += 1;
    } else {
      countMap[char] = 1;
    }
  }
  return countMap;
}

// Xử lý sự kiện khi nhấn nút "Tiếp tục"
document.getElementById("btn-next").addEventListener("click", function () {
  const name = nameInput.value.trim();
  const birthDate = dateInput.value;

  if (name === "" || birthDate === "") {
    alert("Vui lòng điền đầy đủ thông tin vào các ô trống!");
    return;
  }

  const totalSum = calculateSum(birthDate);
  const mainNum = mainNumber(totalSum);

  // Định dạng hiển thị ngày từ YYYY-MM-DD sang DD/MM/YYYY
  const dateParts = birthDate.split("-");
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  // Đổ dữ liệu cơ bản ra giao diện
  document.getElementById("res-name").textContent = name;
  document.getElementById("res-dob").textContent = formattedDate;
  document.getElementById("res-sum").textContent = mainNum;

  // Đổ dữ liệu chi tiết của số chủ đạo
  const mainNumData = getContentMainNumber(mainNum);
  document.getElementById("tu-khoa").textContent =
    mainNumData?.["tu-khoa"] || "Chưa có dữ liệu";
  document.getElementById("nang-luc").textContent =
    mainNumData?.["nang-luc"] || "Chưa có dữ liệu";
  document.getElementById("thach-thuc").textContent =
    mainNumData?.["thach-thuc"] || "Chưa có dữ liệu";
  document.getElementById("bai-hoc").textContent =
    mainNumData?.["bai-hoc"] || "Chưa có dữ liệu";

  // Xử lý đổ dữ liệu luận giải số lần xuất hiện
  const digitCounts = countDigits(birthDate);
  const interpretationDiv = document.getElementById(
    "occurrence-interpretation",
  );
  interpretationDiv.innerHTML = "";

  for (let num in digitCounts) {
    const times = digitCounts[num];
    const numberGroup = getContentOccurrenceNumber(num);

    if (numberGroup) {
      const textDetail = numberGroup[times];
      if (textDetail) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>Số ${num} (${times} lần):</strong> ${textDetail}`;
        interpretationDiv.appendChild(p);
      }
    }
  }

  // --- 1. ĐIỀN SỐ VÀO BIỂU ĐỒ 3x3 ---
  for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    // Nếu số xuất hiện n lần, lặp lại nó n lần (VD: "1" xuất hiện 2 lần -> "11")
    if (digitCounts[i]) {
      cell.textContent = String(i).repeat(digitCounts[i]);
    } else {
      cell.textContent = ""; // Để trống nếu không có số
    }
  }

  // --- 2. THUẬT TOÁN QUÉT MŨI TÊN ---
  const arrowLines = ["147", "258", "369", "123", "456", "789", "159", "357"];
  const arrowsDiv = document.getElementById("arrows-interpretation");
  arrowsDiv.innerHTML = ""; // Xóa dữ liệu mũi tên cũ

  let hasAnyArrow = false;

  arrowLines.forEach((line) => {
    // Cắt chuỗi "147" thành mảng ['1', '4', '7']
    const [a, b, c] = line.split("");

    // Kiểm tra xem 3 con số trên đường này có xuất hiện hay không
    const hasA = digitCounts[a] > 0;
    const hasB = digitCounts[b] > 0;
    const hasC = digitCounts[c] > 0;

    const p = document.createElement("p");

    // Nếu CẢ 3 SỐ đều CÓ -> Mũi tên đầy đủ
    if (hasA && hasB && hasC) {
      p.innerHTML = `<strong>${completedArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
    // Nếu CẢ 3 SỐ đều TRỐNG -> Mũi tên khuyết
    else if (!hasA && !hasB && !hasC) {
      p.className = "empty-arrow"; // Áp class CSS đỏ nhạt
      p.innerHTML = `<strong>${emptyArrows[line]}</strong>`;
      arrowsDiv.appendChild(p);
      hasAnyArrow = true;
    }
  });

  if (!hasAnyArrow) {
    arrowsDiv.innerHTML =
      "<p style='background: #f8fafc; border-left: 3px solid #94a3b8;'>Không có Mũi tên cá tính nổi bật hoặc khuyết hoàn toàn trên biểu đồ này.</p>";
  }

  // Chuyển màn hình giao diện
  document.getElementById("screen-input").classList.add("hidden");
  document.getElementById("screen-display").classList.remove("hidden");
});

// Xử lý sự kiện khi nhấn nút "Trở lại"
document.getElementById("btn-back").addEventListener("click", function () {
  document.getElementById("screen-display").classList.add("hidden");
  document.getElementById("screen-input").classList.remove("hidden");
});
