import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { fetchAllTypeProduct, fetchProductAll } from './callApi'; // Import hàm fetchAllTypeProduct

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(textInput) {
  // Lấy danh sách các loại sản phẩm từ API
  const types = await fetchAllTypeProduct();
  const products = await fetchProductAll();

   // Kiểm tra xem câu hỏi có liên quan đến loại sản phẩm hay không
  let modifiedTextInput = textInput;
  if (
    textInput.toLowerCase().includes('các loại sản phẩm') || 
    textInput.toLowerCase().includes('loại sản phẩm') ||
    textInput.toLowerCase().includes('loại sản phẩm của shop này') 
  ) 
  {
    const typesList = types.length > 0 ? `Các loại sản phẩm của shop AT.E-commerce bao gồm: ${types.join(', ')}.` : "Không có dữ liệu loại sản phẩm.";
    modifiedTextInput = `${typesList} ${textInput}`; // Thêm danh sách loại sản phẩm vào câu hỏi
  }
  
  // Kiểm tra xem câu hỏi có liên quan đến các sản phẩm hay không
  if (
    textInput.toLowerCase().includes('các sản phẩm') || 
    textInput.toLowerCase().includes('sản phẩm của shop này') ||
    textInput.toLowerCase().includes('sản phẩm nào')
  ) {
    const productsList = products.length > 0 ? `Các sản phẩm của shop AT.E-commerce bao gồm: ${products.map(product => product.name).join(', ')}.` : "Không có dữ liệu sản phẩm.";
    modifiedTextInput = `${productsList} ${textInput}`; // Thêm danh sách sản phẩm vào câu hỏi
  }

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(modifiedTextInput);
  console.log(result.response.text());
  return result.response.text(); // Trả về phản hồi từ AI
}

export default run;
