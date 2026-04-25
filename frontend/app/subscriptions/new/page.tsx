import Link from 'next/link';
import { createSubscriptionAction } from '@/app/actions';

export default function NewSubscriptionPage() {
  return (
    <div className="max-w-md">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/subscriptions" className="hover:text-gray-800">Subscriptions</Link>
        <span className="mx-2">/</span>
        <span>New</span>
      </nav>
      <h1 className="text-2xl font-bold mb-6">Create Subscription</h1>
      <form action={createSubscriptionAction} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="adminId" className="text-sm font-medium text-gray-700">Admin ID</label>
          <input
            id="adminId"
            name="adminId"
            type="text"
            required
            placeholder="e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subscriptionType" className="text-sm font-medium text-gray-700">Plan</label>
          <select
            id="subscriptionType"
            name="subscriptionType"
            required
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="Free">Free</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          Create Subscription
        </button>
      </form>
    </div>
  );
}
