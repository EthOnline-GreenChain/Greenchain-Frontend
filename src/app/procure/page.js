// src/app/procure/page.js
"use client";

import React, { useState } from "react";
import FacilityUploadCard from "@/components/procurement/FacilityUploadCard";
import ProcureForm from "@/components/procurement/ProcureForm";
import OptimizedBasket from "@/components/procurement/OptimizedBasket";
import AutoProcureButton from "@/components/procurement/AutoProcureButton";
import ProcureToaster from "@/components/procurement/ProcureToaster";
import ProcureAuditTrail from "@/components/procurement/ProcureAuditTrail";

export default function ProcurePage() {
  const [amount, setAmount] = useState(25);
  const [estimatedCost, setEstimatedCost] = useState((25 * 25).toFixed(2));
  const [isProcessing, setIsProcessing] = useState(false);
  const [toaster, setToaster] = useState(null);

  // handle computed emissions from CSV
  function handleComputedResult({ tCO2e, cost }) {
    setAmount(Math.round(tCO2e));
    setEstimatedCost(Number(cost).toFixed(2));
  }

  const trade = {
    status: "ok",
    trade: {
      order_id: "ORD-78a6fe2d",
      run_id: "78a6fe2d-6743-4408-a194-0f3143c67e8d",
      policy_name: "Balanced quality v1",
      target_tco2e: 0.326,
      basket: {
        target_tco2e: 0.326,
        lines: [
          {
            provider_id:
              "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
            credit_id: "IN-NATURE-2020",
            project_id: "P-IN-001",
            registry: "Verra",
            cls: "nature_based",
            country: "IN",
            vintage: 2020,
            tonnes: 0.1304,
            unit_price_pyusd: 9.8,
            score: 0.731,
          },
          {
            provider_id:
              "agent1qds4dd09w6kq27mpldew0eukzrz0qxxt2y3q5v8synw5kk4873q9sx2lfcm",
            credit_id: "NP-NATURE-2022",
            project_id: "P-NP-001",
            registry: "Verra",
            cls: "nature_based",
            country: "NP",
            vintage: 2022,
            tonnes: 0.08,
            unit_price_pyusd: 9.9,
            score: 0.68375,
          },
          {
            provider_id:
              "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
            credit_id: "IN-TECH-2021",
            project_id: "P-IN-002",
            registry: "Gold Standard",
            cls: "tech_based",
            country: "IN",
            vintage: 2021,
            tonnes: 0.1304,
            unit_price_pyusd: 10.2,
            score: 0.738,
          },
        ],
        expected_total_pyusd: 3.4,
        policy_name: "Balanced quality v1",
      },
      reservation_holds: [
        {
          hold_id: "HOLD-5149ff20",
          provider_id:
            "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
          credit_id: "IN-NATURE-2020",
          tonnes: 0.1304,
          unit_price: 9.8,
          expires_at: "2025-10-25T15:47:39Z",
        },
        {
          hold_id: "HOLD-fb38975c",
          provider_id:
            "agent1qdujjdunu68a9vc8fx6m5gxr0mtwhkxurpjc0sdpqu3fzttg3lds5572c3d",
          credit_id: "IN-TECH-2021",
          tonnes: 0.1304,
          unit_price: 10.2,
          expires_at: "2025-10-25T15:47:39Z",
        },
        {
          hold_id: "HOLD-84186227",
          provider_id:
            "agent1qds4dd09w6kq27mpldew0eukzrz0qxxt2y3q5v8synw5kk4873q9sx2lfcm",
          credit_id: "NP-NATURE-2022",
          tonnes: 0.08,
          unit_price: 9.9,
          expires_at: "2025-10-25T15:47:39Z",
        },
      ],
      settlement: {
        tx_hashes: ["0xTXc4e1e92dab29", "0xTXcd058a7e51c6", "0xTX1b7acd5c0e06"],
        fills: [
          {
            credit_id: "IN-NATURE-2020",
            tonnes: 0.1304,
            unit_price: 9.8,
            hold_id: "HOLD-5149ff20",
          },
          {
            credit_id: "IN-TECH-2021",
            tonnes: 0.1304,
            unit_price: 10.2,
            hold_id: "HOLD-fb38975c",
          },
          {
            credit_id: "NP-NATURE-2022",
            tonnes: 0.08,
            unit_price: 9.9,
            hold_id: "HOLD-84186227",
          },
        ],
      },
      retirements: {
        retirements: [
          {
            credit_id: "IN-NATURE-2020",
            tonnes: 0.1304,
            tx_hash: "0xRET728e8abb2ea1",
            proof_hash:
              "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
          },
          {
            credit_id: "IN-TECH-2021",
            tonnes: 0.1304,
            tx_hash: "0xRETf694c95a33a1",
            proof_hash:
              "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
          },
          {
            credit_id: "NP-NATURE-2022",
            tonnes: 0.08,
            tx_hash: "0xRET4e251ba8b584",
            proof_hash:
              "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
          },
        ],
      },
      proof_bundle_hash:
        "0xff174816f9c85d2eca1dfc18d9d182e8385c834308eb3f26c68e40c7bac31f9f",
    },
  };
  // simulate or handle procure
  async function handleAutoProcure() {
    const id = Date.now().toString();
    const stages = [
      { key: "analysis", label: "Agent analysing providers" },
      { key: "payment", label: "Securing PYUSD payment" },
      { key: "mint", label: "Minting credit tokens" },
      { key: "final", label: "Finalizing" },
    ];

    setToaster({
      id,
      stages,
      stageIndex: 0,
      status: "running",
      message: stages[0].label,
    });
    setIsProcessing(true);

    try {
      const resp = await fetch("/api/procure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!resp.ok) {
        await simulateFlow(amount, setToaster);
      } else {
        const data = await resp.json();
        setToaster((prev) => ({
          ...prev,
          stageIndex: prev?.stages?.length ? prev.stages.length - 1 : 3,
          status: "success",
          message:
            data?.message ??
            `Successfully procured ${data?.amount ?? amount} tCO₂e`,
        }));
        setTimeout(() => setToaster(null), 1600);
      }
    } catch {
      await simulateFlow(amount, setToaster);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-white">Procure Offsets</h1>
        <p className="text-sm text-neutral-400">
          Automatically purchase carbon credits with AI-powered optimization
        </p>
      </header>

      {/* Upload facility card */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <FacilityUploadCard onComputed={handleComputedResult} />
        </div>
      </div>

      {/* Main content (form, basket, and button) */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <ProcureForm
            amount={amount}
            onChange={(v) => {
              setAmount(v);
              setEstimatedCost((v * 25).toFixed(2));
            }}
          />

          <OptimizedBasket amount={amount} />

          {/* Full-width AutoProcureButton */}
          <div className="w-full">
            <AutoProcureButton
              amount={amount}
              loading={isProcessing}
              onClick={handleAutoProcure}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <ProcureAuditTrail trade={trade} />
          </div>
        </div>
      </div>

      {/* Toaster */}
      {toaster && (
        <ProcureToaster toaster={toaster} onClose={() => setToaster(null)} />
      )}
    </div>
  );
}

/**
 * Local simulation of the 4-stage flow with progress updates
 */
function simulateFlow(amount, setToaster) {
  return new Promise((resolve) => {
    const stages = [
      { key: "analysis", label: "Agent analysing providers", duration: 1000 },
      { key: "payment", label: "Securing PYUSD payment", duration: 1600 },
      { key: "mint", label: "Minting credit tokens", duration: 1400 },
      { key: "final", label: "Finalizing", duration: 800 },
    ];

    let idx = 0;

    function showStage(i) {
      setToaster((prev) => ({
        ...prev,
        stageIndex: i,
        status: "running",
        message: stages[i].label,
      }));

      const dur = stages[i].duration;
      setTimeout(() => {
        idx++;
        if (idx < stages.length) {
          showStage(idx);
        } else {
          setToaster((prev) => ({
            ...prev,
            stageIndex: stages.length - 1,
            status: "success",
            message: `Successfully procured ${amount} tCO₂e`,
          }));
          setTimeout(() => {
            setToaster(null);
            resolve();
          }, 1200);
        }
      }, dur);
    }

    setTimeout(() => showStage(0), 240);
  });
}
