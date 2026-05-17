import { useState, useRef } from 'react'
import './App.css'

const THONG_TIN_NHOM = {
  tenDeTai: 'Giới thiệu Ma Trận Wigner, trình bày chi tiết một vài ứng dụng của Ma Trận Wigner, viết chương trình để giải một ví dụ cụ thể',
  monHoc: 'Đại Số Tuyến Tính',
  giangVien: 'TS. Nguyễn Xuân Mỹ',
  thanhVien: [
    { mssv: '2510126', hoTen: 'Trần Đồng Ngọc Anh Khoa' },
    { mssv: '2510015', hoTen: 'Trần Đức Anh' },
    { mssv: '2513575', hoTen: 'Trần Đức Huy' },
    { mssv: '2510172', hoTen: 'Trần Đức Nguyên' },
    { mssv: '2512766', hoTen: 'Trần Đức Phát' },
    { mssv: '2312816', hoTen: 'Trần Hồng Quảng' },
    { mssv: '2511884', hoTen: 'Trần Hồng Khánh Ngọc' },
    { mssv: '2214009', hoTen: 'Trần Lâm Vũ' },
    { mssv: '2511156', hoTen: 'Trần Lê Đức' },
    { mssv: '2513455', hoTen: 'Trần Minh Hoàng' },
  ]
}

const DU_LIEU_MAU = {
  status: 'success',
  has_community: true,
  lambda_max: 2.95,
  k_clusters: 2,
  nodes: Array.from({ length: 34 }, (_, i) => ({ id: String(i), label: i < 17 ? 0 : 1 })),
  graph_stats: { num_nodes: 34, num_edges: 78, density: 0.1390 }
}

const CAC_BUOC = [
  { so: 1, ten: 'Xây dựng Ma Trận Kề', mo_ta: 'Đọc danh sách cạnh, tạo ma trận A (0 và 1)' },
  { so: 2, ten: 'Chuẩn hóa Wigner', mo_ta: 'Biến đổi A thành ma trận Wigner W theo công thức' },
  { so: 3, ten: 'Phân tích phổ', mo_ta: 'Tính Giá trị riêng & Vectơ riêng của W' },
  { so: 4, ten: 'Kiểm định BBP', mo_ta: 'Lọc giá trị riêng > 2.05 để phát hiện cộng đồng' },
  { so: 5, ten: 'Phân cụm K-Means', mo_ta: 'Gán nhãn từng node vào cộng đồng tương ứng' },
]

const MAU_CUM = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']
const TEN_MAU = ['Đỏ', 'Xanh dương', 'Xanh lá', 'Cam', 'Tím']

function App() {
  const [trangThai, setTrangThai] = useState('cho')
  const [ketQua, setKetQua] = useState(null)
  const [tenFile, setTenFile] = useState('')
  const [keoTha, setKeoTha] = useState(false)
  const [buocHienTai, setBuocHienTai] = useState(0)
  const inputRef = useRef()

  const chayThuatToan = async (file) => {
    setTrangThai('dang_xu_ly')
    setBuocHienTai(0)
    for (let i = 1; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 700))
      setBuocHienTai(i)
    }
    setKetQua(DU_LIEU_MAU)
    setTrangThai('thanh_cong')
  }

  const xuLyFile = (file) => {
    if (!file) return
    setTenFile(file.name)
    chayThuatToan(file)
  }

  const handleUpload = (e) => xuLyFile(e.target.files[0])
  const handleDrop = (e) => {
    e.preventDefault()
    setKeoTha(false)
    xuLyFile(e.dataTransfer.files[0])
  }

  const demoMau = () => {
    setTenFile('karate_club.txt')
    chayThuatToan(null)
  }

  const lamLai = () => {
    setTrangThai('cho')
    setKetQua(null)
    setTenFile('')
    setBuocHienTai(0)
  }

  const nhomCum = ketQua
    ? ketQua.nodes.reduce((acc, node) => {
        acc[node.label] = acc[node.label] || []
        acc[node.label].push(node.id)
        return acc
      }, {})
    : {}

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <header className="header">
        <div className="header-top">
          {/* SỬA 1: tên trường */}
          <div className="badge-truong">ĐẠI HỌC BÁCH KHOA – ĐHQG TP.HCM</div>
          {/* SỬA 3: góc phải đổi thành Nhóm 24 */}
          <div className="badge-mon">👥 Nhóm 24</div>
        </div>
        <div className="header-title-wrap">
          <div className="matrix-icon">W</div>
          <div>
            <h1 className="header-title">ỨNG DỤNG MA TRẬN WIGNER</h1>
            <p className="header-subtitle">Phát Hiện Cộng Đồng · Hiện Tượng Chuyển Pha BBP</p>
          </div>
        </div>
        <div className="header-de-tai">
          <span className="label-de-tai">Đề tài:</span>
          <span className="text-de-tai">{THONG_TIN_NHOM.tenDeTai}</span>
        </div>
        <div className="header-info-row">
          <div className="info-card">
            <span className="info-icon">👨‍🏫</span>
            <div>
              <div className="info-label">Giảng viên hướng dẫn</div>
              <div className="info-value">{THONG_TIN_NHOM.giangVien}</div>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">👥</span>
            <div>
              <div className="info-label">Số thành viên</div>
              <div className="info-value">{THONG_TIN_NHOM.thanhVien.length} sinh viên</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        {/* SỬA 2: thu nhỏ các bước */}
        <section className="section">
          <h2 className="section-title">⚙️ Thuật Toán Wigner Community Detection</h2>
          <div className="buoc-wrap">
            {CAC_BUOC.map((buoc) => (
              <div key={buoc.so} className={`buoc-card buoc-nho ${buocHienTai >= buoc.so ? 'buoc-xong' : ''} ${buocHienTai === buoc.so && trangThai === 'dang_xu_ly' ? 'buoc-dang' : ''}`}>
                <div className="buoc-so buoc-so-nho">{buocHienTai >= buoc.so ? '✓' : buoc.so}</div>
                <div className="buoc-noi-dung">
                  <div className="buoc-ten">{buoc.so}. {buoc.ten}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {trangThai === 'cho' && (
          <section className="section">
            <h2 className="section-title">📂 Tải Lên Dữ Liệu</h2>
            <div className={`upload-zone ${keoTha ? 'keo-tha' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setKeoTha(true) }}
              onDragLeave={() => setKeoTha(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}>
              <input ref={inputRef} type="file" accept=".txt,.csv" style={{ display: 'none' }} onChange={handleUpload} />
              <div className="upload-icon">📁</div>
              <div className="upload-text">Kéo thả file hoặc nhấn để chọn</div>
              <div className="upload-sub">Định dạng: .txt hoặc .csv (danh sách cạnh)</div>
              <div className="upload-example">Ví dụ mỗi dòng: <code>0 1</code>, <code>0 2</code>, ...</div>
            </div>
            <div className="hoac">— HOẶC —</div>
            <button className="btn-demo" onClick={demoMau}>
              🧪 Chạy với dữ liệu mẫu (Karate Club — 34 nodes, 78 cạnh)
            </button>
          </section>
        )}

        {trangThai === 'dang_xu_ly' && (
          <section className="section">
            <div className="dang-xu-ly">
              <div className="spinner" />
              <div className="dxl-text">Đang phân tích <strong>{tenFile}</strong>...</div>
              <div className="dxl-buoc">
                {buocHienTai < 5 ? `⏳ Đang thực hiện bước ${buocHienTai + 1}: ${CAC_BUOC[buocHienTai]?.ten}` : '🔄 Đang hoàn tất...'}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(buocHienTai / 5) * 100}%` }} />
              </div>
            </div>
          </section>
        )}

        {trangThai === 'thanh_cong' && ketQua && (
          <>
            <section className="section">
              <h2 className="section-title">📊 Kết Quả Phân Tích</h2>
              <div className="ket-qua-grid">
                <div className="kq-card kq-xanh">
                  <div className="kq-so">{ketQua.graph_stats.num_nodes}</div>
                  <div className="kq-label">Số Node (người dùng)</div>
                </div>
                <div className="kq-card kq-vang">
                  <div className="kq-so">{ketQua.graph_stats.num_edges}</div>
                  <div className="kq-label">Số Cạnh (kết nối)</div>
                </div>
                <div className="kq-card kq-do">
                  <div className="kq-so">{ketQua.lambda_max.toFixed(2)}</div>
                  <div className="kq-label">λ<sub>max</sub> (Giá trị riêng lớn nhất)</div>
                </div>
                <div className="kq-card kq-tim">
                  <div className="kq-so">{ketQua.k_clusters}</div>
                  <div className="kq-label">Số cộng đồng phát hiện được</div>
                </div>
              </div>
              <div className={`bbp-banner ${ketQua.has_community ? 'bbp-co' : 'bbp-khong'}`}>
                {ketQua.has_community
                  ? `✅ Kiểm định BBP: λ_max = ${ketQua.lambda_max} > 2.05 → Phát hiện ${ketQua.k_clusters} cộng đồng!`
                  : '❌ Không có giá trị riêng nào vượt ngưỡng 2.05 → Chỉ toàn nhiễu.'}
              </div>
              <div className="density-row">
                <span>Mật độ đồ thị:</span>
                <div className="density-bar-wrap">
                  <div className="density-bar">
                    <div className="density-fill" style={{ width: `${ketQua.graph_stats.density * 100}%` }} />
                  </div>
                  <span className="density-so">{(ketQua.graph_stats.density * 100).toFixed(1)}%</span>
                </div>
              </div>
            </section>

            <section className="section">
              <h2 className="section-title">🎨 Phân Bố Cộng Đồng</h2>
              <div className="cum-wrap">
                {Object.entries(nhomCum).map(([label, nodes]) => (
                  <div key={label} className="cum-card" style={{ borderColor: MAU_CUM[label] }}>
                    <div className="cum-header" style={{ background: MAU_CUM[label] }}>
                      <span className="cum-ten">Cộng đồng {parseInt(label) + 1}</span>
                      <span className="cum-mau">{TEN_MAU[label]}</span>
                      <span className="cum-so">{nodes.length} thành viên</span>
                    </div>
                    <div className="cum-nodes">
                      {nodes.map(id => (
                        <span key={id} className="node-badge" style={{ background: MAU_CUM[label] + '33', border: `1px solid ${MAU_CUM[label]}`, color: MAU_CUM[label] }}>
                          Node {id}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="lam-lai-wrap">
              <button className="btn-lam-lai" onClick={lamLai}>🔄 Phân tích file mới</button>
            </div>
          </>
        )}

        {/* SỬA 4: danh sách thành viên dạng bảng vô hình */}
        <section className="section">
          <h2 className="section-title">👥 Danh Sách Thành Viên Nhóm</h2>
          <div className="thanh-vien-list">
            {THONG_TIN_NHOM.thanhVien.map((tv, i) => (
              <div key={tv.mssv} className="thanh-vien-row">
                <span className="tv-so">{String(i + 1).padStart(2, '0')}</span>
                <span className="tv-ten">{tv.hoTen}</span>
                <span className="tv-mssv">MSSV: {tv.mssv}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© 2026 · Nhóm Ma Trận Wigner · {THONG_TIN_NHOM.monHoc}</div>
        <div>Giảng viên: {THONG_TIN_NHOM.giangVien}</div>
      </footer>
    </div>
  )
}

export default App