"use client";

import { LogOut, Mail, Lock, ChevronRight, User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <User className="h-7 w-7 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-base text-gray-900">John Doe</h2>
                <p className="text-gray-500 text-sm truncate">john.doe@example.com</p>
                <div className="mt-1.5 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded inline-block">
                    Active User
                </div>
            </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Account</h3>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center px-4 py-3 h-auto hover:bg-gray-50 rounded-none group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <Mail size={16} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-sm text-gray-900">Email Address</div>
                            <div className="text-xs text-gray-400">Update your email</div>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </Button>

                <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center px-4 py-3 h-auto hover:bg-gray-50 rounded-none group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
                            <Lock size={16} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-sm text-gray-900">Password</div>
                            <div className="text-xs text-gray-400">Change your password</div>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </Button>
            </div>
        </div>

        {/* App Settings */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider ml-1">Application</h3>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center px-4 py-3 h-auto hover:bg-gray-50 rounded-none group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-50 p-2 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
                            <Bell size={16} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-sm text-gray-900">Notifications</div>
                            <div className="text-xs text-gray-400">Manage alerts</div>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </Button>

                 <Button 
                    variant="ghost" 
                    className="w-full flex justify-between items-center px-4 py-3 h-auto hover:bg-gray-50 rounded-none group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <Shield size={16} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-sm text-gray-900">Privacy & Security</div>
                            <div className="text-xs text-gray-400">Data permissions</div>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                </Button>
            </div>
        </div>

        {/* Logout */}
        <div className="pt-4">
             <Button 
                variant="outline" 
                className="w-full flex justify-center items-center gap-2 py-3 h-auto text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700 hover:border-red-300"
            >
                <LogOut size={16} />
                <span className="font-medium text-sm">Log Out</span>
            </Button>
            <p className="text-center text-xs text-gray-400 mt-4">
                Version 1.0.2 (Build 2024.1)
            </p>
        </div>
      </div>
    </div>
  );
}
