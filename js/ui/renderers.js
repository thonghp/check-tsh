import { analyzeName } from "../utils/calculator.js";
import { soulContent, expressContent } from "../data/contentName.js";

// Hàm render UI xuất kết quả ra màn hình
function renderNameAnalysis(fullName) {
    const indices = analyzeName(fullName);
    const soulText = soulContent[indices.soulNumber] || "Chưa có dữ liệu giải mã.";
    const expressText = expressContent[indices.expressNumber] || "Chưa có dữ liệu giải mã.";
    const nameContainer = document.getElementById("name-analysis-container");

    // Nếu không tìm thấy container thì thoát hàm để tránh lỗi
    if (!nameContainer) return;

    nameContainer.innerHTML = `
    <div style="margin-top: 30px; width: 100%; text-align: left;">
      <div style="padding: 20px; background-color: #f0fdf4; border-radius: 8px; border-left: 5px solid #22c55e;">
        <h4 style="margin: 0 0 15px 0; color: #14532d; font-size: 16px; font-weight: 700;">👤 Phân Tích Chỉ Số Tên Gọi: ${fullName.toUpperCase()}</h4>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
             <span style="display: inline-block; background: #22c55e; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÊN: ${indices.nameNumber}</span>
             <p style="margin: 5px 0 0 0; font-size: 14px; color: #064e3b; font-style: italic;">(Tổng hòa giữa Tâm hồn [${indices.soulNumber}] và Thể hiện [${indices.expressNumber}])</p>
          </div>

          <div style="border-bottom: 1px dashed #bbf7d0; padding-bottom: 10px;">
            <span style="display: inline-block; background: #0ea5e9; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ TÂM HỒN: ${indices.soulNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #0c4a6e; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${soulText}</p>
          </div>

          <div>
            <span style="display: inline-block; background: #f59e0b; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 5px;">CHỈ SỐ THỂ HIỆN: ${indices.expressNumber}</span>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #78350f; line-height: 1.6;"><strong>Ý nghĩa:</strong> ${expressText}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export { renderNameAnalysis };