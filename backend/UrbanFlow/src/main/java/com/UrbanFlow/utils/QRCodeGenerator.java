package com.UrbanFlow.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

public class QRCodeGenerator {

    /**
     * Generates a QR code image for the given text and returns it as a Base64-encoded string.
     *
     * @param text the text to encode in the QR code
     * @param width the width of the image
     * @param height the height of the image
     * @return a Base64 string of the QR code image (PNG format)
     * @throws WriterException if an error occurs during QR code generation
     * @throws Exception for any other I/O errors
     */
    public static String generateQRCodeImage(String text, int width, int height) throws WriterException, Exception {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                int grayValue = (bitMatrix.get(x, y) ? 0 : 1) & 0xff;
                bufferedImage.setRGB(x, y, (grayValue == 0 ? 0xFF000000 : 0xFFFFFFFF));
            }
        }
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "PNG", pngOutputStream);
        byte[] pngData = pngOutputStream.toByteArray();
        return Base64.getEncoder().encodeToString(pngData);
    }
}
