import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Check } from 'lucide-react';

interface LoginFormProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
  isLoading?: boolean;
}

/**
 * Luxury/Refined Login Form Component
 * High-end, sophisticated design with peach-apricot-caramel color palette
 */
export const LuxuryLoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Demo account credentials
  const DEMO_ACCOUNT = {
    email: 'a0976454270@gmail.com',
    password: '123456',
    role: 'admin',
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle demo account
  const handleUseDemoAccount = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setRememberMe(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = '請輸入電子郵件';
    } else if (!validateEmail(email)) {
      newErrors.email = '請輸入有效的電子郵件';
    }

    if (!password) {
      newErrors.password = '請輸入密碼';
    } else if (password.length < 6) {
      newErrors.password = '密碼至少需要 6 個字符';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(email, password, rememberMe);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    // Simulate social login
    setTimeout(() => {
      console.log(`Logging in with ${provider}`);
      setSocialLoading(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0E8] via-[#FFFBF8] to-[#F9F5F0] flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#F9C5A7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F4845F] rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F9C5A7]/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F4845F] to-[#E8956D] px-8 py-12 text-center">
            <div className="text-4xl mb-3">🏪</div>
            <h1 className="text-2xl font-light text-white tracking-wide">
              WMS Selection
            </h1>
            <p className="text-[#FFF0E8] text-sm font-light mt-2">
              智慧倉儲管理系統
            </p>
          </div>

          {/* Form content */}
          <div className="px-8 py-10">
            {/* Welcome text */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-light text-[#3D2B1F] mb-2">
                歡迎回來
              </h2>
              <p className="text-sm text-[#8B6B5A]">
                登入您的帳戶以繼續
              </p>
            </div>

            {/* Demo account info */}
            <div className="mb-6 p-4 bg-[#F4845F]/8 border border-[#F4845F]/20 rounded-xl">
              <p className="text-sm font-medium text-[#3D2B1F] mb-2">📝 演示帳號</p>
              <p className="text-xs text-[#8B6B5A] mb-1">
                <strong>帳號：</strong> {DEMO_ACCOUNT.email}
              </p>
              <p className="text-xs text-[#8B6B5A] mb-3">
                <strong>密碼：</strong> {DEMO_ACCOUNT.password}
              </p>
              <button
                type="button"
                onClick={handleUseDemoAccount}
                className="w-full py-2 rounded-lg bg-[#F4845F] text-white text-xs font-medium transition-colors hover:bg-[#E8956D]"
              >
                使用演示帳號登入
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3D2B1F]">
                  電子郵件
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8956D] pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="your@email.com"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none font-light ${
                      errors.email
                        ? 'border-red-300 bg-red-50/30 focus:border-red-400'
                        : 'border-[#F9C5A7] bg-[#FFF0E8]/50 focus:border-[#F4845F] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#3D2B1F]">
                  密碼
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E8956D] pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none font-light ${
                      errors.password
                        ? 'border-red-300 bg-red-50/30 focus:border-red-400'
                        : 'border-[#F9C5A7] bg-[#FFF0E8]/50 focus:border-[#F4845F] focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B6B5A] hover:text-[#F4845F] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative w-5 h-5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                      rememberMe
                        ? 'bg-[#F4845F] border-[#F4845F]'
                        : 'border-[#E8956D] group-hover:border-[#F4845F]'
                    }`}>
                      {rememberMe && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-[#8B6B5A] group-hover:text-[#F4845F] transition-colors">
                    記住我
                  </span>
                </label>
                <a href="#" className="text-sm text-[#F4845F] hover:text-[#E8956D] transition-colors font-light">
                  忘記密碼？
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F4845F] to-[#E8956D] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#F4845F]/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>登入中...</span>
                  </span>
                ) : (
                  '登入'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center space-x-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#F9C5A7]" />
              <span className="text-xs text-[#8B6B5A] font-light">或</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#F9C5A7]" />
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
                className="w-full py-3 rounded-xl border-2 border-[#F9C5A7] bg-[#FFF0E8]/50 hover:bg-[#FFF0E8] text-[#3D2B1F] font-light transition-all duration-300 flex items-center justify-center space-x-2 hover:border-[#F4845F] disabled:opacity-50"
              >
                {socialLoading === 'google' ? (
                  <div className="w-4 h-4 border-2 border-[#F4845F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">🔍</span>
                    <span>Google 登入</span>
                  </>
                )}
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                disabled={socialLoading !== null}
                className="w-full py-3 rounded-xl border-2 border-[#F9C5A7] bg-[#FFF0E8]/50 hover:bg-[#FFF0E8] text-[#3D2B1F] font-light transition-all duration-300 flex items-center justify-center space-x-2 hover:border-[#F4845F] disabled:opacity-50"
              >
                {socialLoading === 'apple' ? (
                  <div className="w-4 h-4 border-2 border-[#F4845F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">🍎</span>
                    <span>Apple 登入</span>
                  </>
                )}
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={socialLoading !== null}
                className="w-full py-3 rounded-xl border-2 border-[#F9C5A7] bg-[#FFF0E8]/50 hover:bg-[#FFF0E8] text-[#3D2B1F] font-light transition-all duration-300 flex items-center justify-center space-x-2 hover:border-[#F4845F] disabled:opacity-50"
              >
                {socialLoading === 'github' ? (
                  <div className="w-4 h-4 border-2 border-[#F4845F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">💻</span>
                    <span>GitHub 登入</span>
                  </>
                )}
              </button>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center text-sm text-[#8B6B5A]">
              還沒有帳戶？{' '}
              <a href="#" className="text-[#F4845F] hover:text-[#E8956D] font-medium transition-colors">
                立即註冊
              </a>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-6 text-center text-xs text-[#8B6B5A]">
          <p>© 2026 WMS Selection Retail Lab</p>
          <p className="mt-1">庫存最佳化解決方案</p>
        </div>
      </div>
    </div>
  );
};

export default LuxuryLoginForm;
