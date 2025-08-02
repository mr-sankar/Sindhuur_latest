import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const plan = searchParams.get("plan") || "premium";
  const price = searchParams.get("price") || "2999";

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
    upiId: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const planDetails = {
    premium: { name: "Premium", duration: "3 Months", price: "2,999" },
    "premium plus": { name: "Premium Plus", duration: "6 Months", price: "4,999" },
  };

  const currentPlan = planDetails[plan as keyof typeof planDetails] || planDetails.premium;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Your ${currentPlan.name} membership has been activated.`,
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/membership")}
            className="mb-6 text-orange-600 hover:bg-orange-50"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Plans
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Summary */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 text-orange-600" size={20} />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">{currentPlan.name} Plan</h3>
                  <p className="text-orange-100">{currentPlan.duration}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subscription Fee</span>
                    <span>₹{currentPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>₹0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{currentPlan.price}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                  <p className="font-medium">What you get:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Unlimited profile views</li>
                    <li>Direct contact details</li>
                    <li>Profile boost</li>
                    <li>Priority support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 text-orange-600" size={20} />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid grid-cols-2 bg-orange-100">
                    <TabsTrigger value="card" className="text-orange-700">Card</TabsTrigger>
                    <TabsTrigger value="upi" className="text-orange-700">UPI</TabsTrigger>
                  </TabsList>

                  {/* Card */}
                  <TabsContent value="card" className="mt-4 space-y-4">
                    <Label>Email Address</Label>
                    <Input
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-orange-200"
                    />

                    <Label>Phone Number</Label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-orange-200"
                    />

                    <Separator />

                    <Label>Cardholder Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      className="border-orange-200"
                    />

                    <Label>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="border-orange-200"
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Month</Label>
                        <Select value={formData.expiryMonth} onValueChange={(val) => handleInputChange("expiryMonth", val)}>
                          <SelectTrigger className="border-orange-200">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Year</Label>
                        <Select value={formData.expiryYear} onValueChange={(val) => handleInputChange("expiryYear", val)}>
                          <SelectTrigger className="border-orange-200">
                            <SelectValue placeholder="YY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={String(24 + i)}>
                                {24 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>CVV</Label>
                        <Input
                          placeholder="123"
                          maxLength={3}
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="border-orange-200"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* UPI */}
                  <TabsContent value="upi" className="mt-4 space-y-4">
                    <div className="space-y-2 border border-yellow-400 p-4 rounded">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@bank"
                        value={formData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                        className="bg-orange-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We’ll send a collect request to this UPI ID.
                      </p>

                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2 text-gray-700">Supported UPI Apps</p>
                        <div className="flex justify-between items-center gap-4">
                          {["phonepe", "googlepay", "razorpay"].map((app) => (
                            <div key={app} className="flex flex-col items-center">
                              <img src={`/assets/${app}.png`} alt={app} className="h-12 w-12 object-contain" />
                              <span className="text-xs mt-1 capitalize">{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-6"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${currentPlan.price}`}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <p>Your payment is secured with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
