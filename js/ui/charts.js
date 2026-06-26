import { peakNumbersContent } from "../data/contentPeak.js";

// Hàm rút gọn về dải 1 đến 9 (Dùng cho Tầng đáy và Tầng 1)
function reduceTo9(num) {
    while (num > 9) {
        num = num
            .toString()
            .split("")
            .reduce((acc, d) => acc + parseInt(d), 0);
    }
    return num;
}

// Hàm rút gọn có giữ lại số 10 và 11 (Dùng cho Tầng 2 và Tầng 3)
function reduceTo11(num) {
    while (num > 11) {
        num = num
            .toString()
            .split("")
            .reduce((acc, d) => acc + parseInt(d), 0);
    }
    return num;
}

// Hàm sinh biểu đồ sóng chu kỳ và highlight năm cá nhân hiện tại màu đỏ
function drawWaveChart(activeYear) {
  const container = document.getElementById("wave-chart-container");

  // Tọa độ các điểm nút (X, Y) trên đồ thị khớp chính xác hình dáng lượn sóng của bạn
  const points = [
    { year: 9, x: 35, y: 40, pos: "left", label: "9" },
    { year: 1, x: 95, y: 55, pos: "top", label: "1" },
    { year: 2, x: 145, y: 90, pos: "right", label: "2" },
    { year: 3, x: 195, y: 130, pos: "left", label: "3" },
    { year: 4, x: 245, y: 160, pos: "bottom", label: "4" }, // Điểm trũng 4
    { year: 5, x: 305, y: 135, pos: "right", label: "5" },
    { year: 6, x: 365, y: 105, pos: "top", label: "6" }, // Đỉnh phụ 6
    { year: 7, x: 425, y: 160, pos: "bottom", label: "7" }, // Điểm trũng 7
    { year: 8, x: 485, y: 85, pos: "right", label: "8" },
    { year: 9, x: 550, y: 35, pos: "top", label: "9" }, // Đỉnh cao 9
  ];

  let svgHtml = `
    <svg viewBox="0 0 580 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: #f8fafc; border-radius: 8px; padding: 10px;">
      <path d="M 35 40 C 75 40, 75 40, 95 55 C 135 75, 165 105, 195 130 C 215 150, 225 160, 245 160 C 265 160, 285 150, 305 135 C 335 110, 345 105, 365 105 C 385 105, 405 120, 425 160 C 445 200, 465 130, 485 85 C 515 35, 535 35, 550 35" 
            fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
  `;

  // Duyệt qua danh sách điểm để vẽ text và chấm tròn
  points.forEach((p, index) => {
    // Nếu trùng năm cá nhân (ưu tiên highlight nút cuối nếu rơi vào năm 9)
    const isActive =
      p.year === activeYear && (activeYear !== 9 || index === 9 || index === 0);
    const nodeColor = isActive ? "#ef4444" : "#000000";
    const nodeRadius = isActive ? "7" : "5";
    const textWeight = isActive ? "bold" : "normal";
    const textSize = isActive ? "16px" : "13px";

    // Tính toán độ lệch vị trí nhãn chữ để không đè lên đường sóng
    let tx = p.x;
    let ty = p.y;
    if (p.pos === "top") ty -= 14;
    if (p.pos === "bottom") ty += 20;
    if (p.pos === "left") {
      tx -= 14;
      ty += 5;
    }
    if (p.pos === "right") {
      tx += 14;
      ty += 5;
    }

    svgHtml += `
      <circle cx="${p.x}" cy="${p.y}" r="${nodeRadius}" fill="${nodeColor}" />
      <text x="${tx}" y="${ty}" fill="${nodeColor}" font-size="${textSize}" font-weight="${textWeight}" text-anchor="middle">${p.label}</text>
    `;
  });

  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;
}

// Hàm tính toán và vẽ SVG Kim Tự Tháp 4 Đỉnh Cao kết hợp luận giải ý nghĩa
function drawPyramidChart(birthDateStr, mainNum) {
  const container = document.getElementById("pyramid-chart-container");

  // 1. TÁCH DỮ LIỆU NGÀY SINH (Định dạng đầu vào YYYY-MM-DD)
  const parts = birthDateStr.split("-");
  const birthYear = parseInt(parts[0]);
  const birthMonth = parseInt(parts[1]);
  const birthDay = parseInt(parts[2]);

  // 2. TÍNH TOÁN GIÁ TRỊ CÁC NÚT (Theo công thức chuẩn)
  // Tầng đáy: Rút gọn về 1 <= x <= 9
  const A = reduceTo9(birthMonth); // Trái (Tháng)
  const B = reduceTo9(birthDay); // Giữa (Ngày)
  const C = reduceTo9(birthYear); // Phải (Năm)

  // Tầng 1: Tính 2 đỉnh đầu (<= 9)
  const vPeak1 = reduceTo9(A + B);
  const vPeak2 = reduceTo9(B + C);

  // Tầng 2: Tính đỉnh 3 (<= 11)
  const vPeak3 = reduceTo11(vPeak1 + vPeak2);

  // Tầng 3: Tính đỉnh 4 cao nhất (<= 11)
  const vPeak4 = reduceTo11(A + C);

  // 3. TÍNH TOÁN ĐỘ TUỔI VÀ NĂM ĐẠT ĐỈNH
  const age1 = 36 - mainNum;
  const age2 = age1 + 9;
  const age3 = age2 + 9;
  const age4 = age3 + 9;

  const year1 = birthYear + age1;
  const year2 = birthYear + age2;
  const year3 = birthYear + age3;
  const year4 = birthYear + age4;

  // 4. XÂY DỰNG MÃ SVG VẼ KIM TỰ THÁP
  const coords = {
    m: { x: 100, y: 320 },
    d: { x: 300, y: 320 },
    y: { x: 500, y: 320 },
    p1: { x: 200, y: 220 },
    p2: { x: 400, y: 220 },
    p3: { x: 300, y: 120 },
    p4: { x: 300, y: 30 },
  };

  const svgHtml = `
    <svg viewBox="0 0 600 380" width="100%" height="100%" style="max-width: 600px; font-family: sans-serif; display: block; margin: 0 auto;" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#1e293b" stroke-width="2">
        <line x1="${coords.m.x}" y1="${coords.m.y}" x2="${coords.p1.x}" y2="${coords.p1.y}" />
        <line x1="${coords.d.x}" y1="${coords.d.y}" x2="${coords.p1.x}" y2="${coords.p1.y}" />
        <line x1="${coords.d.x}" y1="${coords.d.y}" x2="${coords.p2.x}" y2="${coords.p2.y}" />
        <line x1="${coords.y.x}" y1="${coords.y.y}" x2="${coords.p2.x}" y2="${coords.p2.y}" />
        <line x1="${coords.p1.x}" y1="${coords.p1.y}" x2="${coords.p3.x}" y2="${coords.p3.y}" />
        <line x1="${coords.p2.x}" y1="${coords.p2.y}" x2="${coords.p3.x}" y2="${coords.p3.y}" />
        <line x1="${coords.m.x}" y1="${coords.m.y}" x2="${coords.p4.x}" y2="${coords.p4.y}" />
        <line x1="${coords.y.x}" y1="${coords.y.y}" x2="${coords.p4.x}" y2="${coords.p4.y}" />
      </g>

      <g text-anchor="middle" font-weight="bold" font-size="16px">
        <circle cx="${coords.m.x}" cy="${coords.m.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.m.x}" y="${coords.m.y + 6}" fill="#1e3a8a">${A}</text>
        
        <circle cx="${coords.d.x}" cy="${coords.d.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.d.x}" y="${coords.d.y + 6}" fill="#1e3a8a">${B}</text>
        
        <circle cx="${coords.y.x}" cy="${coords.y.y}" r="22" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
        <text x="${coords.y.x}" y="${coords.y.y + 6}" fill="#1e3a8a">${C}</text>

        <circle cx="${coords.p1.x}" cy="${coords.p1.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p1.x}" y="${coords.p1.y + 6}" fill="#4c1d95">${vPeak1}</text>

        <circle cx="${coords.p2.x}" cy="${coords.p2.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p2.x}" y="${coords.p2.y + 6}" fill="#4c1d95">${vPeak2}</text>

        <circle cx="${coords.p3.x}" cy="${coords.p3.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p3.x}" y="${coords.p3.y + 6}" fill="#4c1d95">${vPeak3}</text>

        <circle cx="${coords.p4.x}" cy="${coords.p4.y}" r="22" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
        <text x="${coords.p4.x}" y="${coords.p4.y + 6}" fill="#4c1d95">${vPeak4}</text>
      </g>

      <g fill="#475569" font-size="13px" text-anchor="middle">
        <text x="${coords.m.x}" y="${coords.m.y + 45}">Tháng sinh</text>
        <text x="${coords.d.x}" y="${coords.d.y + 45}">Ngày sinh</text>
        <text x="${coords.y.x}" y="${coords.y.y + 45}">Năm sinh</text>

        <text x="${coords.p1.x}" y="${coords.p1.y + 45}" font-weight="bold">${age1} tuổi</text>
        <text x="${coords.p1.x}" y="${coords.p1.y + 60}">(${year1})</text>

        <text x="${coords.p2.x}" y="${coords.p2.y + 45}" font-weight="bold">${age2} tuổi</text>
        <text x="${coords.p2.x}" y="${coords.p2.y + 60}">(${year2})</text>

        <text x="${coords.p3.x}" y="${coords.p3.y + 45}" font-weight="bold">${age3} tuổi</text>
        <text x="${coords.p3.x}" y="${coords.p3.y + 60}">(${year3})</text>

        <text x="${coords.p4.x + 35}" y="${coords.p4.y}" text-anchor="start" font-weight="bold">${age4} tuổi</text>
        <text x="${coords.p4.x + 35}" y="${coords.p4.y + 15}" text-anchor="start">(${year4})</text>
        
        <text x="${coords.p1.x - 30}" y="${coords.p1.y - 15}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 1</text>
        <text x="${coords.p2.x + 30}" y="${coords.p2.y - 15}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 2</text>
        <text x="${coords.p3.x + 40}" y="${coords.p3.y - 10}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 3</text>
        <text x="${coords.p4.x - 40}" y="${coords.p4.y}" fill="#ef4444" font-weight="bold" font-size="12px">Đỉnh 4</text>
      </g>
    </svg>
  `;

  // 5. LẤY NỘI DUNG LUẬN GIẢI CHO TỪNG ĐỈNH DỰA TRÊN KẾT QUẢ SỐ TÍNH ĐƯỢC
  const descPeak1 = peakNumbersContent[vPeak1] || "Chưa có dữ liệu giải mã.";
  const descPeak2 = peakNumbersContent[vPeak2] || "Chưa có dữ liệu giải mã.";
  const descPeak3 = peakNumbersContent[vPeak3] || "Chưa có dữ liệu giải mã.";
  const descPeak4 = peakNumbersContent[vPeak4] || "Chưa có dữ liệu giải mã.";

  // 6. TẠO KHỐI BẢNG TÓM TẮT VÀ NỘI DUNG LUẬN GIẢI CHI TIẾT
  const summaryHtml = `
    <div style="margin-top: 30px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f1f5f9; border-radius: 8px; border-left: 5px solid #3b82f6; margin-bottom: 25px;">
        <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 700;">📌 Tuổi đạt đỉnh</h4>
        <ul style="margin: 0; padding-left: 20px; color: #334155; line-height: 1.8; font-size: 15px;">
          <li><strong>Đạt đỉnh 1</strong> = 36 - ${mainNum} (Số chủ đạo) = <strong>${age1} tuổi</strong> <em>(Năm ${year1})</em></li>
          <li><strong>Đạt đỉnh 2</strong> = Đỉnh 1 (${age1}) + 9 = <strong>${age2} tuổi</strong> <em>(Năm ${year2})</em></li>
          <li><strong>Đạt đỉnh 3</strong> = Đỉnh 2 (${age2}) + 9 = <strong>${age3} tuổi</strong> <em>(Năm ${year3})</em></li>
          <li><strong>Đạt đỉnh 4</strong> = Đỉnh 3 (${age3}) + 9 = <strong>${age4} tuổi</strong> <em>(Năm ${year4})</em></li>
        </ul>
      </div>

      <div style="padding: 20px; background-color: #fdf2f8; border-radius: 8px; border-left: 5px solid #db2777;">
        <h4 style="margin: 0 0 15px 0; color: #831843; font-size: 16px; font-weight: 700;">🔮 Ý nghĩa các con số trong đỉnh cao của bạn</h4>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 1: Số ${vPeak1}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age1} tuổi (${year1}):</strong> ${descPeak1}</p>
          </div>

          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 2: Số ${vPeak2}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age2} tuổi (${year2}):</strong> ${descPeak2}</p>
          </div>

          <div style="border-bottom: 1px dashed #fbcfe8; padding-bottom: 10px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 3: Số ${vPeak3}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age3} tuổi (${year3}):</strong> ${descPeak3}</p>
          </div>

          <div style="padding-bottom: 5px;">
            <span style="display: inline-block; background: #db2777; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">ĐỈNH 4: Số ${vPeak4}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #4d0620; line-height: 1.6;"><strong>Năm ${age4} tuổi (${year4}):</strong> ${descPeak4}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Gắn toàn bộ cấu trúc SVG và phần nội dung text vào container chính
  container.innerHTML =
    `<div style="display: flex; flex-direction: column; align-items: center; width: 100%;">` +
    svgHtml +
    summaryHtml +
    `</div>`;
}

export { drawWaveChart, drawPyramidChart };